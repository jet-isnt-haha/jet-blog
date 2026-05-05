export {};

declare module "#app" {
  interface NuxtApp {
    $formatDate: (value: string) => string;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $formatDate: (value: string) => string;
  }
}
