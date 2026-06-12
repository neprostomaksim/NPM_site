export const post = {
  name: "post",
  title: "Блог (Статьи)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Заголовок статьи",
      type: "string",
      validation: (Rule) => Rule.required().error("Заголовок обязателен"),
    },
    {
      name: "slug",
      title: "Ссылка (URL-адрес)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Ссылка обязательна"),
    },
    {
      name: "publishedAt",
      title: "Дата публикации",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error("Укажите дату публикации"),
    },
    {
      name: "excerpt",
      title: "Краткое описание (для карточки в сетке)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().error("Краткое описание обязательно"),
    },
    {
      name: "mainImage",
      title: "Главное изображение (обложка)",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "body",
      title: "Текст статьи (редактор разметки)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Обычный текст", value: "normal" },
            { title: "Заголовок H2", value: "h2" },
            { title: "Заголовок H3", value: "h3" },
            { title: "Заголовок H4", value: "h4" },
            { title: "Цитата", value: "blockquote" },
          ],
          lists: [
            { title: "Маркированный список", value: "bullet" },
            { title: "Нумерованный список", value: "number" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Описание картинки (для поисковиков)",
              validation: (Rule) => Rule.required().warning("Рекомендуется заполнить alt-текст для SEO"),
            },
          ],
        },
        {
          type: "code",
          options: {
            withFilename: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().error("Текст статьи не может быть пустым"),
    },
    {
      name: "seoTitle",
      title: "SEO Заголовок (Meta Title)",
      type: "string",
      description: "Отображается во вкладке браузера. Если не заполнено, будет использоваться заголовок статьи.",
    },
    {
      name: "seoDescription",
      title: "SEO Описание (Meta Description)",
      type: "text",
      rows: 2,
      description: "Рекомендуется 140–160 символов. Краткое описание статьи для результатов поиска Google/Яндекс.",
    },
  ],
};
