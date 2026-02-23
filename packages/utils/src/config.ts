/** todo: rename to 'utils config' */
export interface AxiEngineConfig {
  pathSeparator: string;

  /** logging and debugging logic in future */
  // logLevel: 'debug' | 'info' | 'warn' | 'error';
  // defaultLocale: string;
}

const defaultConfig: AxiEngineConfig = {
  pathSeparator: '/'
};

export const axiSettings: AxiEngineConfig = { ...defaultConfig };

/**
 * set up global configuration for axi-engine.
 * @param newConfig - configuration object
 */
export function configure(newConfig: Partial<AxiEngineConfig>): void {
  Object.assign(axiSettings, newConfig);
}
