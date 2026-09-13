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
        {
          type: "table",
          title: "Таблица",
        },
      ],
      validation: (Rule) => Rule.required().error("Текст статьи не может быть пустым"),
    },
    {
      name: "seoTitle",
      title: "SEO Заголовок (Meta Title)",
      type: "string",
      description:
        "Короткий заголовок для вкладки браузера и выдачи Google/Яндекс. Держите в 50–60 символах — иначе поисковик обрежет его. Если не заполнить, подставится длинный заголовок статьи (часто обрезается). Заполнять настоятельно рекомендуется.",
      validation: (Rule) => [
        Rule.max(60).warning(
          "Больше 60 символов — Google обрежет заголовок в результатах поиска."
        ),
        Rule.custom((value) =>
          value
            ? true
            : "Рекомендуется задать короткий SEO-заголовок (50–60 символов), иначе подставится длинный заголовок статьи."
        ).warning(),
      ],
    },
    {
      name: "seoDescription",
      title: "SEO Описание (Meta Description)",
      type: "text",
      rows: 2,
      description:
        "Краткое описание статьи для результатов поиска Google/Яндекс. Оптимально 140–160 символов. Если не заполнить, подставится краткое описание (excerpt).",
      validation: (Rule) => [
        Rule.max(160).warning(
          "Больше 160 символов — поисковик обрежет описание в выдаче."
        ),
        Rule.custom((value) =>
          value
            ? true
            : "Рекомендуется задать SEO-описание (140–160 символов) для лучшего сниппета в поиске."
        ).warning(),
      ],
    },
  ],
};
