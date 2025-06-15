// commitlint-formatter.cjs
const chalk = require('chalk');

/**
 * @param {import('@commitlint/types').LintResults} results
 * @returns {string}
 */
function formatter(results) {
  const output = [];

  for (const result of results.results) {
    const { hash = '', input, errors, warnings, valid } = result;

    // Header commit
    output.push(
      chalk.bold.underline(`📝🔍 Checking Commit ${hash || '(no hash)'}`.trim())
    );
    output.push(`${chalk.cyan('💬 Commit Message:')} ${chalk.bold(input)}`);

    if (valid && errors.length === 0 && warnings.length === 0) {
      output.push(
        chalk.greenBright('🎉✅ Woohoo! Commit message looks perfect! 🚀\n')
      );
      continue;
    }

    // Show errors
    if (errors.length > 0) {
      output.push(chalk.redBright('❌🔥 Uh-oh! Errors found:'));
      for (const error of errors) {
        output.push(`  🛑 ${chalk.redBright(error.message)}`);
      }
    }

    // Show warnings
    if (warnings.length > 0) {
      output.push(chalk.yellowBright('⚠️🧐 Some warnings to check:'));
      for (const warning of warnings) {
        output.push(`  ⚠️ ${chalk.yellowBright(warning.message)}`);
      }
    }

    output.push('\n📚 Need help? Read: https://www.conventionalcommits.org/en/v1.0.0/');
    output.push(''); // newline between commits
  }

  return output.join('\n');
}

module.exports = formatter;
