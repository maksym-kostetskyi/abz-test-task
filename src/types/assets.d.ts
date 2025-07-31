declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

// Path alias declarations
declare module "@/assets/*" {
  const content: string;
  export default content;
}

declare module "@/assets/*.svg" {
  const content: string;
  export default content;
}
