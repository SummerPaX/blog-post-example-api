import config from 'config';

export class ConfigUtil {
  static get<T = any>(key: string, defaultValue?: T): T {
    return config.get(key) ?? defaultValue;
  }
}
