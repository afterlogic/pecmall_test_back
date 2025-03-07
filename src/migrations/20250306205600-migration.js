const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(company_data) => "users"
 * addColumn(legal_address) => "users"
 *
 */

const info = {
  revision: 3,
  name: "migration",
  created: "2025-03-06T20:56:00.045Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "users",
      "company_data",
      {
        type: Sequelize.JSON,
        field: "company_data",
        allowNull: true,
        defaultValue: null,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "legal_address",
      {
        type: Sequelize.JSON,
        field: "legal_address",
        allowNull: true,
        defaultValue: null,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["users", "company_data", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["users", "legal_address", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
