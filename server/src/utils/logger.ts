// Terminal color codes (lightweight and terminal-safe)
const COLORS = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
  };
  
 
//   const getTime = (): string =>
//     `${COLORS.gray}${new Date().toLocaleTimeString()}${COLORS.reset}`;
  
  
  const banner = (
    emoji: string,
    label: string,
    color: string,
    message: string,
    trailing = ''
  ): void => {
    const tag = `${COLORS.bold}${color}[ ${label} ]${COLORS.reset}`;
    console.log(`${emoji} ${tag}  → ${message} ${trailing}`);
  };
  
 
  const divider = (title = 'LOG'): void => {
    const line = '─'.repeat(20);
    console.log(`${COLORS.blue}\n${line} [ ${title} ] ${line}${COLORS.reset}`);
  };
  
 
 
  const logger = {
    success: (msg: string) => banner('✅', 'SUCCESS', COLORS.green, msg),
    info: (msg: string) => banner('💡', 'INFO', COLORS.cyan, msg),
    warn: (msg: string) => banner('⚠️', 'WARNING', COLORS.yellow, msg),
    error: (msg: string) => banner('❌', 'ERROR', COLORS.red, msg),
    custom: (label: string, msg: string, emoji = '📌', color = COLORS.white) =>
      banner(emoji, label.toUpperCase(), color, msg),
  
    divider,
  
    step: (msg: string, stepNum?: number) => {
      const label = stepNum !== undefined ? `STEP ${stepNum}` : 'STEP';
      banner('🔄', label, COLORS.blue, msg);
    },
  
    section: (title: string) => {
      const line = '═'.repeat(65);
      console.log(`${COLORS.yellow}\n${line}\n🗄️  ${COLORS.bold}${title}${COLORS.reset}\n${line}${COLORS.reset}`);
    },
  };
  
  export default logger;
  