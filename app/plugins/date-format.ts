export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate(value: string) {
        return new Intl.DateTimeFormat("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(value));
      },
    },
  };
});
