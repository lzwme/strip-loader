export interface StripLoaderOptions {
  start?: string;
  end?: string;
  isReplaceWithPlaceHolder?: boolean;
  disabled?: boolean;
  debug?: boolean;
}

export default function stripLoader(content: string | Buffer, _map: object, _meta: any): string;
