declare module '*.mdx' {
  import { ComponentType } from 'react';
  const Component: ComponentType<any>;
  export default Component;
}