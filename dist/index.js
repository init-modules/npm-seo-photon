"use client";

// src/module.tsx
import {
  createPhotonKit,
  PhotonFieldEditorList
} from "@init/photon";
import { jsx, jsxs } from "react/jsx-runtime";
var valueActionOptions = [
  {
    label: "Embedded",
    labelKey: "seoPhoton.actions.embedded.label",
    value: "embedded"
  },
  {
    label: "Force",
    labelKey: "seoPhoton.actions.force.label",
    value: "force"
  }
];
var arrayActionOptions = [
  {
    label: "Add",
    labelKey: "seoPhoton.actions.add.label",
    value: "add"
  },
  {
    label: "Replace",
    labelKey: "seoPhoton.actions.replace.label",
    value: "replace"
  }
];
var mediaActionOptions = [
  {
    label: "Force",
    labelKey: "seoPhoton.actions.force.label",
    value: "force"
  },
  {
    label: "Resource",
    labelKey: "seoPhoton.actions.resource.label",
    value: "resource"
  },
  {
    label: "Resource or Embedded",
    labelKey: "seoPhoton.actions.resourceOrEmbedded.label",
    value: "resource_or_embedded"
  }
];
var normalizeOptions = (value) => {
  if (Array.isArray(value)) {
    return value.filter(
      (item) => typeof item === "object" && item !== null && typeof item.label === "string" && typeof item.value === "string"
    ).map((item) => ({
      label: item.label,
      value: item.value
    }));
  }
  if (typeof value !== "object" || value === null) {
    return [];
  }
  return Object.entries(value).flatMap(
    ([optionValue, label]) => typeof label === "string" ? [
      {
        value: optionValue,
        label
      }
    ] : []
  );
};
var hasDefinedValue = (value) => value !== void 0;
var buildSeoSettingsFields = ({
  showSitemap,
  showLocale,
  resourceTemplateOptions,
  globalTemplateOptions
}) => {
  const fields = [];
  if (showSitemap) {
    fields.push({
      path: "seo.includeInSitemap",
      label: "Include in sitemap",
      labelKey: "seoPhoton.fields.includeInSitemap.label",
      kind: "toggle",
      description: "Controls whether this route is emitted by the shared sitemap service.",
      descriptionKey: "seoPhoton.fields.includeInSitemap.description"
    });
  }
  if (resourceTemplateOptions.length > 0) {
    fields.push({
      path: "seo.seoMetaResourceTemplateId",
      label: "Resource template",
      labelKey: "seoPhoton.fields.resourceTemplate.label",
      kind: "select",
      options: resourceTemplateOptions,
      description: "Optional SEO template from init/seo that can prefill meta values for this route or record.",
      descriptionKey: "seoPhoton.fields.resourceTemplate.description"
    });
  }
  if (globalTemplateOptions.length > 0) {
    fields.push({
      path: "seo.seoMetaGlobalTemplateId",
      label: "Global template",
      labelKey: "seoPhoton.fields.globalTemplate.label",
      kind: "select",
      options: globalTemplateOptions,
      description: "Shared global template layered underneath this editable SEO template.",
      descriptionKey: "seoPhoton.fields.globalTemplate.description"
    });
  }
  if (showLocale) {
    fields.push({
      path: "seo.locale",
      label: "Locale",
      labelKey: "seoPhoton.fields.locale.label",
      kind: "text",
      description: "Optional locale key, for example ru or en.",
      descriptionKey: "seoPhoton.fields.locale.description"
    });
  }
  fields.push(
    {
      path: "seo.priority",
      label: "Priority",
      labelKey: "seoPhoton.fields.priority.label",
      kind: "text",
      description: "Sitemap priority. Twig expressions stay supported, so this remains a text field.",
      descriptionKey: "seoPhoton.fields.priority.description"
    },
    {
      path: "seo.priorityAction",
      label: "Priority action",
      labelKey: "seoPhoton.fields.priorityAction.label",
      kind: "select",
      options: valueActionOptions
    }
  );
  return fields;
};
var seoMainFields = [
  {
    path: "seo.title",
    label: "Title",
    labelKey: "seoPhoton.fields.title.label",
    kind: "text"
  },
  {
    path: "seo.titleAction",
    label: "Title action",
    labelKey: "seoPhoton.fields.titleAction.label",
    kind: "select",
    options: valueActionOptions
  },
  {
    path: "seo.description",
    label: "Description",
    labelKey: "seoPhoton.fields.description.label",
    kind: "textarea"
  },
  {
    path: "seo.descriptionAction",
    label: "Description action",
    labelKey: "seoPhoton.fields.descriptionAction.label",
    kind: "select",
    options: valueActionOptions
  },
  {
    path: "seo.descriptionMaxLength",
    label: "Description max length",
    labelKey: "seoPhoton.fields.descriptionMaxLength.label",
    kind: "text",
    description: "Soft clip length. Kept as text because SEO templates may use dynamic expressions.",
    descriptionKey: "seoPhoton.fields.descriptionMaxLength.description"
  }
];
var seoExtraFields = [
  {
    path: "seo.keywords",
    label: "Keywords",
    labelKey: "seoPhoton.fields.keywords.label",
    kind: "tags"
  },
  {
    path: "seo.keywordsAction",
    label: "Keywords action",
    labelKey: "seoPhoton.fields.keywordsAction.label",
    kind: "select",
    options: arrayActionOptions
  },
  {
    path: "seo.canonicalUrl",
    label: "Canonical URL",
    labelKey: "seoPhoton.fields.canonicalUrl.label",
    kind: "text"
  },
  {
    path: "seo.canonicalUrlAction",
    label: "Canonical URL action",
    labelKey: "seoPhoton.fields.canonicalUrlAction.label",
    kind: "select",
    options: valueActionOptions
  },
  {
    path: "seo.robots",
    label: "Robots",
    labelKey: "seoPhoton.fields.robots.label",
    kind: "text"
  },
  {
    path: "seo.robotsAction",
    label: "Robots action",
    labelKey: "seoPhoton.fields.robotsAction.label",
    kind: "select",
    options: valueActionOptions
  },
  {
    path: "seo.jsonLd",
    label: "JSON-LD",
    labelKey: "seoPhoton.fields.jsonLd.label",
    kind: "json",
    description: "Structured data payload stored as JSON.",
    descriptionKey: "seoPhoton.fields.jsonLd.description"
  },
  {
    path: "seo.jsonLdAction",
    label: "JSON-LD action",
    labelKey: "seoPhoton.fields.jsonLdAction.label",
    kind: "select",
    options: arrayActionOptions
  }
];
var seoOpenGraphFields = [
  {
    path: "seo.ogTitle",
    label: "OG title",
    labelKey: "seoPhoton.fields.ogTitle.label",
    kind: "text"
  },
  {
    path: "seo.ogTitleAction",
    label: "OG title action",
    labelKey: "seoPhoton.fields.ogTitleAction.label",
    kind: "select",
    options: valueActionOptions
  },
  {
    path: "seo.ogDescription",
    label: "OG description",
    labelKey: "seoPhoton.fields.ogDescription.label",
    kind: "textarea"
  },
  {
    path: "seo.ogDescriptionAction",
    label: "OG description action",
    labelKey: "seoPhoton.fields.ogDescriptionAction.label",
    kind: "select",
    options: valueActionOptions
  },
  {
    path: "seo.ogType",
    label: "OG type",
    labelKey: "seoPhoton.fields.ogType.label",
    kind: "text"
  },
  {
    path: "seo.ogTypeAction",
    label: "OG type action",
    labelKey: "seoPhoton.fields.ogTypeAction.label",
    kind: "select",
    options: valueActionOptions
  },
  {
    path: "seo.ogUrl",
    label: "OG URL",
    labelKey: "seoPhoton.fields.ogUrl.label",
    kind: "text"
  },
  {
    path: "seo.ogUrlAction",
    label: "OG URL action",
    labelKey: "seoPhoton.fields.ogUrlAction.label",
    kind: "select",
    options: valueActionOptions
  },
  {
    path: "seo.ogImage",
    label: "OG image",
    labelKey: "seoPhoton.fields.ogImage.label",
    kind: "image"
  },
  {
    path: "seo.ogImageAction",
    label: "OG image action",
    labelKey: "seoPhoton.fields.ogImageAction.label",
    kind: "select",
    options: mediaActionOptions
  }
];
var seoTwitterFields = [
  {
    path: "seo.twitterTitle",
    label: "Twitter title",
    labelKey: "seoPhoton.fields.twitterTitle.label",
    kind: "text"
  },
  {
    path: "seo.twitterTitleAction",
    label: "Twitter title action",
    labelKey: "seoPhoton.fields.twitterTitleAction.label",
    kind: "select",
    options: valueActionOptions
  },
  {
    path: "seo.twitterDescription",
    label: "Twitter description",
    labelKey: "seoPhoton.fields.twitterDescription.label",
    kind: "textarea"
  },
  {
    path: "seo.twitterDescriptionAction",
    label: "Twitter description action",
    labelKey: "seoPhoton.fields.twitterDescriptionAction.label",
    kind: "select",
    options: valueActionOptions
  },
  {
    path: "seo.twitterImage",
    label: "Twitter image",
    labelKey: "seoPhoton.fields.twitterImage.label",
    kind: "image"
  },
  {
    path: "seo.twitterImageAction",
    label: "Twitter image action",
    labelKey: "seoPhoton.fields.twitterImageAction.label",
    kind: "select",
    options: mediaActionOptions
  }
];
var sectionClassName = "space-y-4 rounded-[22px] border border-white/8 bg-slate-950/40 px-4 py-4";
var SeoPhotonPageSettingsPanel = ({
  scope,
  getValue,
  setValue,
  focusField
}) => {
  const resourceTemplateOptions = normalizeOptions(
    getValue("seo.resourceTemplateOptions")
  );
  const globalTemplateOptions = normalizeOptions(
    getValue("seo.globalTemplateOptions")
  );
  const settingsFields = buildSeoSettingsFields({
    showSitemap: hasDefinedValue(getValue("seo.includeInSitemap")),
    showLocale: hasDefinedValue(getValue("seo.locale")),
    resourceTemplateOptions,
    globalTemplateOptions
  });
  const scopeCopy = {
    page: "Static page SEO stored on the route itself.",
    template: globalTemplateOptions.length > 0 ? "Template-level SEO defaults layered through init/publication-seo resource templates." : "Template-level SEO stored on the shared route pattern.",
    record: "Record-level SEO for the current entity behind this route, merged with any active template defaults."
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-cyan-300/14 bg-cyan-300/8 px-4 py-3 text-sm leading-6 text-cyan-100/80", children: scopeCopy[scope] }),
    settingsFields.length > 0 ? /* @__PURE__ */ jsxs("div", { className: sectionClassName, children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 text-[11px] uppercase tracking-[0.24em] text-white/35", children: "Settings" }),
      /* @__PURE__ */ jsx(
        PhotonFieldEditorList,
        {
          fields: settingsFields,
          subjectId: `seo-page-settings:${scope}`,
          getValue,
          onChange: setValue,
          onFocus: focusField
        }
      )
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: sectionClassName, children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 text-[11px] uppercase tracking-[0.24em] text-white/35", children: "Main meta" }),
      /* @__PURE__ */ jsx(
        PhotonFieldEditorList,
        {
          fields: seoMainFields,
          subjectId: `seo-main:${scope}`,
          getValue,
          onChange: setValue,
          onFocus: focusField
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: sectionClassName, children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 text-[11px] uppercase tracking-[0.24em] text-white/35", children: "Extra fields" }),
      /* @__PURE__ */ jsx(
        PhotonFieldEditorList,
        {
          fields: seoExtraFields,
          subjectId: `seo-extra:${scope}`,
          getValue,
          onChange: setValue,
          onFocus: focusField
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: sectionClassName, children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 text-[11px] uppercase tracking-[0.24em] text-white/35", children: "Open Graph" }),
      /* @__PURE__ */ jsx(
        PhotonFieldEditorList,
        {
          fields: seoOpenGraphFields,
          subjectId: `seo-og:${scope}`,
          getValue,
          onChange: setValue,
          onFocus: focusField
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: sectionClassName, children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 text-[11px] uppercase tracking-[0.24em] text-white/35", children: "Twitter" }),
      /* @__PURE__ */ jsx(
        PhotonFieldEditorList,
        {
          fields: seoTwitterFields,
          subjectId: `seo-twitter:${scope}`,
          getValue,
          onChange: setValue,
          onFocus: focusField
        }
      )
    ] })
  ] });
};
var createSeoPageSettingsPanel = (scope, label, labelKey, description, descriptionKey, order) => ({
  key: `seo-photon:seo:${scope}`,
  scope,
  label,
  labelKey,
  description,
  descriptionKey,
  order,
  component: SeoPhotonPageSettingsPanel
});
var seoPhotonModule = {
  module: "seo-photon",
  label: "SEO Photon",
  labelKey: "seoPhoton.module.label",
  version: "0.1.0",
  blocks: [],
  pageSettingsPanels: [
    createSeoPageSettingsPanel(
      "page",
      "SEO",
      "seoPhoton.panel.label",
      "Route-level SEO for standalone pages backed by init/seo.",
      "seoPhoton.panel.page.description",
      100
    ),
    createSeoPageSettingsPanel(
      "template",
      "SEO",
      "seoPhoton.panel.label",
      "Shared template SEO, including publication template defaults when that bridge package is installed.",
      "seoPhoton.panel.template.description",
      100
    ),
    createSeoPageSettingsPanel(
      "record",
      "SEO",
      "seoPhoton.panel.label",
      "Current-record SEO for dynamic entity routes.",
      "seoPhoton.panel.record.description",
      100
    )
  ]
};
var seoPhotonKit = createPhotonKit({
  key: "seo-photon",
  label: "SEO Photon",
  modules: [seoPhotonModule]
});
export {
  seoPhotonKit,
  seoPhotonModule
};
