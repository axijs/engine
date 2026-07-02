export interface UtilsConfig {
  pathSeparator: string;

  /** logging and debugging logic in future */
  // logLevel: 'debug' | 'info' | 'warn' | 'error';
  // defaultLocale: string;
}

const defaultConfig: UtilsConfig = {
  pathSeparator: '/'
};

export const utilsSettings: UtilsConfig = { ...defaultConfig };

/**
 * set up global configuration for axi-engine.
 * @param newConfig - configuration object
 */
export function configure(newConfig: Partial<UtilsConfig>): void {
  Object.assign(utilsSettings, newConfig);
}
