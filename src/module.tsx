"use client";

import {
	createWebsiteBuilderKit,
	type WebsiteBuilderField,
	WebsiteBuilderFieldEditorList,
	type WebsiteBuilderFieldOption,
	type WebsiteBuilderInstallableKit,
	type WebsiteBuilderModule,
	type WebsiteBuilderPageSettingsPanelDefinition,
	type WebsiteBuilderPageSettingsScope,
} from "@init-modules/website-builder";

const valueActionOptions: WebsiteBuilderFieldOption[] = [
	{
		label: "Embedded",
		labelKey: "seoWebsiteBuilder.actions.embedded.label",
		value: "embedded",
	},
	{
		label: "Force",
		labelKey: "seoWebsiteBuilder.actions.force.label",
		value: "force",
	},
];

const arrayActionOptions: WebsiteBuilderFieldOption[] = [
	{
		label: "Add",
		labelKey: "seoWebsiteBuilder.actions.add.label",
		value: "add",
	},
	{
		label: "Replace",
		labelKey: "seoWebsiteBuilder.actions.replace.label",
		value: "replace",
	},
];

const mediaActionOptions: WebsiteBuilderFieldOption[] = [
	{
		label: "Force",
		labelKey: "seoWebsiteBuilder.actions.force.label",
		value: "force",
	},
	{
		label: "Resource",
		labelKey: "seoWebsiteBuilder.actions.resource.label",
		value: "resource",
	},
	{
		label: "Resource or Embedded",
		labelKey: "seoWebsiteBuilder.actions.resourceOrEmbedded.label",
		value: "resource_or_embedded",
	},
];

const normalizeOptions = (value: unknown): WebsiteBuilderFieldOption[] => {
	if (Array.isArray(value)) {
		return value
			.filter(
				(item): item is { label: string; value: string } =>
					typeof item === "object" &&
					item !== null &&
					typeof item.label === "string" &&
					typeof item.value === "string",
			)
			.map((item) => ({
				label: item.label,
				value: item.value,
			}));
	}

	if (typeof value !== "object" || value === null) {
		return [];
	}

	return Object.entries(value as Record<string, unknown>).flatMap(
		([optionValue, label]) =>
			typeof label === "string"
				? [
						{
							value: optionValue,
							label,
						},
					]
				: [],
	);
};

const hasDefinedValue = (value: unknown) => value !== undefined;

const buildSeoSettingsFields = ({
	showSitemap,
	showLocale,
	resourceTemplateOptions,
	globalTemplateOptions,
}: {
	showSitemap: boolean;
	showLocale: boolean;
	resourceTemplateOptions: WebsiteBuilderFieldOption[];
	globalTemplateOptions: WebsiteBuilderFieldOption[];
}): WebsiteBuilderField[] => {
	const fields: WebsiteBuilderField[] = [];

	if (showSitemap) {
		fields.push({
			path: "seo.includeInSitemap",
			label: "Include in sitemap",
			labelKey: "seoWebsiteBuilder.fields.includeInSitemap.label",
			kind: "toggle",
			description:
				"Controls whether this route is emitted by the shared sitemap service.",
			descriptionKey: "seoWebsiteBuilder.fields.includeInSitemap.description",
		});
	}

	if (resourceTemplateOptions.length > 0) {
		fields.push({
			path: "seo.seoMetaResourceTemplateId",
			label: "Resource template",
			labelKey: "seoWebsiteBuilder.fields.resourceTemplate.label",
			kind: "select",
			options: resourceTemplateOptions,
			description:
				"Optional SEO template from init/seo that can prefill meta values for this route or record.",
			descriptionKey: "seoWebsiteBuilder.fields.resourceTemplate.description",
		});
	}

	if (globalTemplateOptions.length > 0) {
		fields.push({
			path: "seo.seoMetaGlobalTemplateId",
			label: "Global template",
			labelKey: "seoWebsiteBuilder.fields.globalTemplate.label",
			kind: "select",
			options: globalTemplateOptions,
			description:
				"Shared global template layered underneath this editable SEO template.",
			descriptionKey: "seoWebsiteBuilder.fields.globalTemplate.description",
		});
	}

	if (showLocale) {
		fields.push({
			path: "seo.locale",
			label: "Locale",
			labelKey: "seoWebsiteBuilder.fields.locale.label",
			kind: "text",
			description: "Optional locale key, for example ru or en.",
			descriptionKey: "seoWebsiteBuilder.fields.locale.description",
		});
	}

	fields.push(
		{
			path: "seo.priority",
			label: "Priority",
			labelKey: "seoWebsiteBuilder.fields.priority.label",
			kind: "text",
			description:
				"Sitemap priority. Twig expressions stay supported, so this remains a text field.",
			descriptionKey: "seoWebsiteBuilder.fields.priority.description",
		},
		{
			path: "seo.priorityAction",
			label: "Priority action",
			labelKey: "seoWebsiteBuilder.fields.priorityAction.label",
			kind: "select",
			options: valueActionOptions,
		},
	);

	return fields;
};

const seoMainFields: WebsiteBuilderField[] = [
	{
		path: "seo.title",
		label: "Title",
		labelKey: "seoWebsiteBuilder.fields.title.label",
		kind: "text",
	},
	{
		path: "seo.titleAction",
		label: "Title action",
		labelKey: "seoWebsiteBuilder.fields.titleAction.label",
		kind: "select",
		options: valueActionOptions,
	},
	{
		path: "seo.description",
		label: "Description",
		labelKey: "seoWebsiteBuilder.fields.description.label",
		kind: "textarea",
	},
	{
		path: "seo.descriptionAction",
		label: "Description action",
		labelKey: "seoWebsiteBuilder.fields.descriptionAction.label",
		kind: "select",
		options: valueActionOptions,
	},
	{
		path: "seo.descriptionMaxLength",
		label: "Description max length",
		labelKey: "seoWebsiteBuilder.fields.descriptionMaxLength.label",
		kind: "text",
		description:
			"Soft clip length. Kept as text because SEO templates may use dynamic expressions.",
		descriptionKey: "seoWebsiteBuilder.fields.descriptionMaxLength.description",
	},
];

const seoExtraFields: WebsiteBuilderField[] = [
	{
		path: "seo.keywords",
		label: "Keywords",
		labelKey: "seoWebsiteBuilder.fields.keywords.label",
		kind: "tags",
	},
	{
		path: "seo.keywordsAction",
		label: "Keywords action",
		labelKey: "seoWebsiteBuilder.fields.keywordsAction.label",
		kind: "select",
		options: arrayActionOptions,
	},
	{
		path: "seo.canonicalUrl",
		label: "Canonical URL",
		labelKey: "seoWebsiteBuilder.fields.canonicalUrl.label",
		kind: "text",
	},
	{
		path: "seo.canonicalUrlAction",
		label: "Canonical URL action",
		labelKey: "seoWebsiteBuilder.fields.canonicalUrlAction.label",
		kind: "select",
		options: valueActionOptions,
	},
	{
		path: "seo.robots",
		label: "Robots",
		labelKey: "seoWebsiteBuilder.fields.robots.label",
		kind: "text",
	},
	{
		path: "seo.robotsAction",
		label: "Robots action",
		labelKey: "seoWebsiteBuilder.fields.robotsAction.label",
		kind: "select",
		options: valueActionOptions,
	},
	{
		path: "seo.jsonLd",
		label: "JSON-LD",
		labelKey: "seoWebsiteBuilder.fields.jsonLd.label",
		kind: "json",
		description: "Structured data payload stored as JSON.",
		descriptionKey: "seoWebsiteBuilder.fields.jsonLd.description",
	},
	{
		path: "seo.jsonLdAction",
		label: "JSON-LD action",
		labelKey: "seoWebsiteBuilder.fields.jsonLdAction.label",
		kind: "select",
		options: arrayActionOptions,
	},
];

const seoOpenGraphFields: WebsiteBuilderField[] = [
	{
		path: "seo.ogTitle",
		label: "OG title",
		labelKey: "seoWebsiteBuilder.fields.ogTitle.label",
		kind: "text",
	},
	{
		path: "seo.ogTitleAction",
		label: "OG title action",
		labelKey: "seoWebsiteBuilder.fields.ogTitleAction.label",
		kind: "select",
		options: valueActionOptions,
	},
	{
		path: "seo.ogDescription",
		label: "OG description",
		labelKey: "seoWebsiteBuilder.fields.ogDescription.label",
		kind: "textarea",
	},
	{
		path: "seo.ogDescriptionAction",
		label: "OG description action",
		labelKey: "seoWebsiteBuilder.fields.ogDescriptionAction.label",
		kind: "select",
		options: valueActionOptions,
	},
	{
		path: "seo.ogType",
		label: "OG type",
		labelKey: "seoWebsiteBuilder.fields.ogType.label",
		kind: "text",
	},
	{
		path: "seo.ogTypeAction",
		label: "OG type action",
		labelKey: "seoWebsiteBuilder.fields.ogTypeAction.label",
		kind: "select",
		options: valueActionOptions,
	},
	{
		path: "seo.ogUrl",
		label: "OG URL",
		labelKey: "seoWebsiteBuilder.fields.ogUrl.label",
		kind: "text",
	},
	{
		path: "seo.ogUrlAction",
		label: "OG URL action",
		labelKey: "seoWebsiteBuilder.fields.ogUrlAction.label",
		kind: "select",
		options: valueActionOptions,
	},
	{
		path: "seo.ogImage",
		label: "OG image",
		labelKey: "seoWebsiteBuilder.fields.ogImage.label",
		kind: "image",
	},
	{
		path: "seo.ogImageAction",
		label: "OG image action",
		labelKey: "seoWebsiteBuilder.fields.ogImageAction.label",
		kind: "select",
		options: mediaActionOptions,
	},
];

const seoTwitterFields: WebsiteBuilderField[] = [
	{
		path: "seo.twitterTitle",
		label: "Twitter title",
		labelKey: "seoWebsiteBuilder.fields.twitterTitle.label",
		kind: "text",
	},
	{
		path: "seo.twitterTitleAction",
		label: "Twitter title action",
		labelKey: "seoWebsiteBuilder.fields.twitterTitleAction.label",
		kind: "select",
		options: valueActionOptions,
	},
	{
		path: "seo.twitterDescription",
		label: "Twitter description",
		labelKey: "seoWebsiteBuilder.fields.twitterDescription.label",
		kind: "textarea",
	},
	{
		path: "seo.twitterDescriptionAction",
		label: "Twitter description action",
		labelKey: "seoWebsiteBuilder.fields.twitterDescriptionAction.label",
		kind: "select",
		options: valueActionOptions,
	},
	{
		path: "seo.twitterImage",
		label: "Twitter image",
		labelKey: "seoWebsiteBuilder.fields.twitterImage.label",
		kind: "image",
	},
	{
		path: "seo.twitterImageAction",
		label: "Twitter image action",
		labelKey: "seoWebsiteBuilder.fields.twitterImageAction.label",
		kind: "select",
		options: mediaActionOptions,
	},
];

const sectionClassName =
	"space-y-4 rounded-[22px] border border-white/8 bg-slate-950/40 px-4 py-4";

const SeoWebsiteBuilderPageSettingsPanel = ({
	scope,
	getValue,
	setValue,
	focusField,
}: Parameters<WebsiteBuilderPageSettingsPanelDefinition["component"]>[0]) => {
	const resourceTemplateOptions = normalizeOptions(
		getValue("seo.resourceTemplateOptions"),
	);
	const globalTemplateOptions = normalizeOptions(
		getValue("seo.globalTemplateOptions"),
	);
	const settingsFields = buildSeoSettingsFields({
		showSitemap: hasDefinedValue(getValue("seo.includeInSitemap")),
		showLocale: hasDefinedValue(getValue("seo.locale")),
		resourceTemplateOptions,
		globalTemplateOptions,
	});
	const scopeCopy: Record<WebsiteBuilderPageSettingsScope, string> = {
		page: "Static page SEO stored on the route itself.",
		template:
			globalTemplateOptions.length > 0
				? "Template-level SEO defaults layered through init/publication-seo resource templates."
				: "Template-level SEO stored on the shared route pattern.",
		record:
			"Record-level SEO for the current entity behind this route, merged with any active template defaults.",
	};

	return (
		<div className="space-y-5">
			<div className="rounded-2xl border border-cyan-300/14 bg-cyan-300/8 px-4 py-3 text-sm leading-6 text-cyan-100/80">
				{scopeCopy[scope]}
			</div>

			{settingsFields.length > 0 ? (
				<div className={sectionClassName}>
					<div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/35">
						Settings
					</div>
					<WebsiteBuilderFieldEditorList
						fields={settingsFields}
						subjectId={`seo-page-settings:${scope}`}
						getValue={getValue}
						onChange={setValue}
						onFocus={focusField}
					/>
				</div>
			) : null}

			<div className={sectionClassName}>
				<div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/35">
					Main meta
				</div>
				<WebsiteBuilderFieldEditorList
					fields={seoMainFields}
					subjectId={`seo-main:${scope}`}
					getValue={getValue}
					onChange={setValue}
					onFocus={focusField}
				/>
			</div>

			<div className={sectionClassName}>
				<div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/35">
					Extra fields
				</div>
				<WebsiteBuilderFieldEditorList
					fields={seoExtraFields}
					subjectId={`seo-extra:${scope}`}
					getValue={getValue}
					onChange={setValue}
					onFocus={focusField}
				/>
			</div>

			<div className={sectionClassName}>
				<div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/35">
					Open Graph
				</div>
				<WebsiteBuilderFieldEditorList
					fields={seoOpenGraphFields}
					subjectId={`seo-og:${scope}`}
					getValue={getValue}
					onChange={setValue}
					onFocus={focusField}
				/>
			</div>

			<div className={sectionClassName}>
				<div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/35">
					Twitter
				</div>
				<WebsiteBuilderFieldEditorList
					fields={seoTwitterFields}
					subjectId={`seo-twitter:${scope}`}
					getValue={getValue}
					onChange={setValue}
					onFocus={focusField}
				/>
			</div>
		</div>
	);
};

const createSeoPageSettingsPanel = (
	scope: WebsiteBuilderPageSettingsScope,
	label: string,
	labelKey: string,
	description: string,
	descriptionKey: string,
	order: number,
): WebsiteBuilderPageSettingsPanelDefinition => ({
	key: `seo-website-builder:seo:${scope}`,
	scope,
	label,
	labelKey,
	description,
	descriptionKey,
	order,
	component: SeoWebsiteBuilderPageSettingsPanel,
});

export const seoWebsiteBuilderModule: WebsiteBuilderModule = {
	module: "seo-website-builder",
	label: "SEO Website Builder",
	labelKey: "seoWebsiteBuilder.module.label",
	version: "0.1.0",
	blocks: [],
	pageSettingsPanels: [
		createSeoPageSettingsPanel(
			"page",
			"SEO",
			"seoWebsiteBuilder.panel.label",
			"Route-level SEO for standalone pages backed by init/seo.",
			"seoWebsiteBuilder.panel.page.description",
			100,
		),
		createSeoPageSettingsPanel(
			"template",
			"SEO",
			"seoWebsiteBuilder.panel.label",
			"Shared template SEO, including publication template defaults when that bridge package is installed.",
			"seoWebsiteBuilder.panel.template.description",
			100,
		),
		createSeoPageSettingsPanel(
			"record",
			"SEO",
			"seoWebsiteBuilder.panel.label",
			"Current-record SEO for dynamic entity routes.",
			"seoWebsiteBuilder.panel.record.description",
			100,
		),
	],
};

export const seoWebsiteBuilderKit: WebsiteBuilderInstallableKit =
	createWebsiteBuilderKit({
		key: "seo-website-builder",
		label: "SEO Website Builder",
		modules: [seoWebsiteBuilderModule],
	});
