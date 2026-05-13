import { Command } from 'commander';

const program = new Command();

program
  .name('ai-os-security')
  .description('AI OS Security Operations CLI')
  .version('1.0.0');

program
  .command('research')
  .description('Run parallel research')
  .argument('<topic>', 'Research topic')
  .option('-s, --sources <sources>', 'Data sources (web,database,file)', 'web,database')
  .action(async (topic: string, options: any) => {
    console.log(`Running research for: ${topic} with sources: ${options.sources}`);
  });

program
  .command('context')
  .description('Build context for agent')
  .argument('<agent>', 'Specialist agent name')
  .argument('<topic>', 'Context topic')
  .action(async (agent: string, topic: string) => {
    console.log(`Building context for ${agent} on ${topic}`);
  });

export { program };