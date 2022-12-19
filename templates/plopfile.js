const shell = require('shelljs');

// TODO: read prefix form .radiusrc
const configData = {
  prefix: 'Radius',
  style: 'emotion' /* "modules" | "styled" | "emotion" */,
  libraryName: 'core-components',
};

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('component', {
    description: 'creates a new library component',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter Component Name (ex. button):',
      },
      {
        type: 'input',
        name: 'elementType',
        message: 'Element type (div, span, button, etc.):',
      },
    ],
    actions: (answers) => {
      const data = { ...answers, ...configData };
      const actionsArray = [
        {
          type: 'add',
          path: '../library/{{dashCase libraryName}}/{{dashCase name}}/index.ts',
          templateFile: './library-component/index.hbs',
          data,
        },
        {
          type: 'add',
          path: '../library/{{dashCase libraryName}}/{{dashCase name}}/__tests__/{{dashCase name}}.test.tsx',
          templateFile: './library-component/test.hbs',
          data,
        },
        {
          type: 'add',
          path: '../library/{{dashCase libraryName}}/{{dashCase name}}/{{dashCase name}}.stories.tsx',
          templateFile: './library-component/stories.hbs',
          data,
        },
        {
          type: 'prettier',
          configProp: '{{dashCase name}}',
        },
      ];

      // ---[ SCSS Modules ]-----------------------
      if (data.style === 'modules')
        actionsArray.push(
          {
            type: 'add',
            path: '../library/{{dashCase libraryName}}/{{dashCase name}}/{{dashCase name}}.module.scss',
            templateFile: './library-component/styles.modules.hbs',
            data,
          },
          {
            type: 'add',
            path: '../library/{{dashCase libraryName}}/{{dashCase name}}/{{dashCase name}}.tsx',
            templateFile: './library-component/component.modules.hbs',
            data,
          }
        );
      // ---[ Styled Components ]-----------------------
      if (data.style === 'styled')
        actionsArray.push(
          {
            type: 'add',
            path: '../library/{{dashCase libraryName}}/{{dashCase name}}/{{dashCase name}}.styles.ts',
            templateFile: './library-component/styles.styled.hbs',
            data,
          },
          {
            type: 'add',
            path: '../library/{{dashCase libraryName}}/{{dashCase name}}/{{dashCase name}}.tsx',
            templateFile: './library-component/component.styled.hbs',
            data,
          }
        );
      // ---[ Emotion ]-----------------------
      if (data.style === 'emotion')
        actionsArray.push(
          {
            type: 'add',
            path: '../library/{{dashCase libraryName}}/{{dashCase name}}/{{dashCase name}}.styles.ts',
            templateFile: './library-component/styles.emotion.hbs',
            data,
          },
          {
            type: 'add',
            path: '../library/{{dashCase libraryName}}/{{dashCase name}}/{{dashCase name}}.tsx',
            templateFile: './library-component/component.emotion.hbs',
            data,
          }
        );

      console.log(
        data.style,
        actionsArray.map(({ path }) => path)
      );

      return actionsArray;
    },
  });

  // This will run prettier on the generated files
  plop.setActionType('prettier', ({ name }) => {
    shell.exec(`npx prettier "library/${name}" -w`, {
      silent: true,
    });
    return '';
  });
};
