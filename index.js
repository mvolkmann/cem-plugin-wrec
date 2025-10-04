//TODO: Does this support JSDoc comment attributes like @attr by default?
export default function wrecPlugin() {
  console.log("wrecPlugin function entered");
  const MEMBERS_TO_HIDE = new Set(["css", "html", "properties"]);

  let currentClass;
  let isStatic = false;
  let Kind = {};
  let propertyName = "";

  function nodeValue(node) {
    const { initializer } = node;
    switch (initializer.kind) {
      case Kind.Identifier:
        return initializer.getText();
      case Kind.FalseKeyword:
        return false;
      case Kind.TrueKeyword:
        return true;
      case Kind.NumericLiteral:
        return Number(node.initializer.text);
      case Kind.NullKeyword:
        return null;
      case Kind.StringLiteral:
        return node.initializer.text;
      default:
        return undefined;
    }
  }

  return {
    name: "wrec-plugin",

    // Runs before analysis starts
    //initialize({ ts, customElementsManifest, context }) {},

    // Runs for all modules in a project, before continuing to the analyzePhase
    //collectPhase({ ts, node, context }) {},

    // Runs for each module
    analyzePhase({ ts, node, moduleDoc, context }) {
      Kind = ts.SyntaxKind;

      switch (node.kind) {
        case Kind.ClassDeclaration:
          const className = node.name.getText();
          const heritage = node.heritageClauses[0];
          if (heritage) {
            const superclass = heritage.types[0].expression.getText();
            if (superclass === "Wrec") {
              const elementName = className
                .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                .toLowerCase();
              moduleDoc.exports.push({
                kind: "custom-element-definition",
                name: elementName,
                declaration: {
                  name: className,
                  module: moduleDoc.path,
                },
              });
              currentClass = moduleDoc?.declarations?.find(
                (declaration) => declaration.name === className
              );
            }
          }
          break;

        case Kind.ObjectLiteralExpression: {
          if (isStatic && propertyName === "properties") {
            if (!currentClass.attributes) currentClass.attributes = [];

            for (const property of node.properties) {
              const name = property.name.getText();
              let doc = "";
              let type;
              let value;

              if (property.kind === Kind.PropertyAssignment) {
                const { initializer } = property;
                if (initializer.kind === Kind.ObjectLiteralExpression) {
                  for (const property2 of initializer.properties) {
                    const name2 = property2.name.getText();
                    const value2 = nodeValue(property2);
                    if (name2 === "doc") doc = value2;
                    if (name2 === "type") type = value2;
                    if (name2 === "value") value = value2;
                  }
                }
              }

              currentClass.attributes.push({
                default: value,
                description: doc,
                fieldName: name,
                name,
                type,
              });
            }

            isStatic = false;
          }
          break;
        }

        case Kind.PropertyDeclaration:
          propertyName = node.name.getText();
          break;

        case Kind.StaticKeyword:
          isStatic = true;
          break;
      }
    },

    // Runs for each module, after analyzing, all information about your module should now be available
    moduleLinkPhase({ moduleDoc, context }) {
      const classes = moduleDoc?.declarations?.filter(
        (declaration) => declaration.kind === "class"
      );

      for (const aClass of classes) {
        const { members } = aClass;
        if (members) {
          aClass.members = members.filter(
            (member) => !MEMBERS_TO_HIDE.has(member.name)
          );
        }
      }
    },

    // Runs after modules have been parsed and after post-processing
    //packageLinkPhase({ customElementsManifest, context }) {},
  };
}
