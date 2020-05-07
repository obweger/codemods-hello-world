module.exports = (fileInfo, api, options) => {
    const j = api.jscodeshift;

    return j(fileInfo.source)
        .find(j.ImportDeclaration, { source: { value: options.from } })
        .forEach(importDeclaration => {
            importDeclaration.replace(j.importDeclaration(importDeclaration.node.specifiers, j.literal(options.to)));
        })
        .toSource();
};
