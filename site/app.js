import '@fluentui/web-components/web-components.js';
import { setTheme } from '@fluentui/web-components';
import { webDarkTheme, webLightTheme } from '@fluentui/tokens';

import arrowIcon from '@fluentui/svg-icons/icons/arrow_right_24_regular.svg';
import bookIcon from '@fluentui/svg-icons/icons/book_open_24_regular.svg';
import peopleIcon from '@fluentui/svg-icons/icons/people_team_24_regular.svg';
import hatIcon from '@fluentui/svg-icons/icons/hat_graduation_24_regular.svg';
import hatSparkleIcon from '@fluentui/svg-icons/icons/hat_graduation_sparkle_24_regular.svg';
import searchIcon from '@fluentui/svg-icons/icons/search_24_regular.svg';
import searchSparkleIcon from '@fluentui/svg-icons/icons/search_sparkle_24_regular.svg';
import slideIcon from '@fluentui/svg-icons/icons/slide_multiple_24_regular.svg';
import tableIcon from '@fluentui/svg-icons/icons/table_simple_24_regular.svg';
import chartIcon from '@fluentui/svg-icons/icons/data_histogram_24_regular.svg';
import calendarIcon from '@fluentui/svg-icons/icons/calendar_ltr_24_regular.svg';
import accessibilityIcon from '@fluentui/svg-icons/icons/accessibility_24_regular.svg';
import quizIcon from '@fluentui/svg-icons/icons/quiz_new_24_regular.svg';
import sparkleIcon from '@fluentui/svg-icons/icons/sparkle_24_regular.svg';
import excelIcon from './assets/excel.svg';
import powerpointIcon from './assets/powerpoint.svg';
import sharepointIcon from './assets/sharepoint.svg';

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
const applyTheme = (event) => setTheme(event.matches ? webDarkTheme : webLightTheme);
applyTheme(colorScheme);
colorScheme.addEventListener('change', applyTheme);

const iconUrls = {
  arrow: arrowIcon,
  book: bookIcon,
  people: peopleIcon,
  hat: hatIcon,
  hatSparkle: hatSparkleIcon,
  search: searchIcon,
  searchSparkle: searchSparkleIcon,
  slide: slideIcon,
  table: tableIcon,
  chart: chartIcon,
  calendar: calendarIcon,
  accessibility: accessibilityIcon,
  quiz: quizIcon,
  sparkle: sparkleIcon,
  Excel: excelIcon,
  PowerPoint: powerpointIcon,
  SharePoint: sharepointIcon,
};

let skills = [];
const categoryLabels = {
  'Teaching & Learning': 'Teaching & Learning',
  'Data & Insights': 'Assessment & Insights',
  'Planning & Operations': 'School Operations',
  Communication: 'Communication & Training',
  Accessibility: 'Accessibility & Inclusion',
};

const categoryIcons = {
  'Teaching & Learning': 'book',
  'Data & Insights': 'chart',
  'Planning & Operations': 'calendar',
  Communication: 'people',
  Accessibility: 'accessibility',
};

const appGuidance = {
  PowerPoint: {
    supportUrl: 'https://support.microsoft.com/en-us/powerpoint/copilot/copilot-in-powerpoint-skills',
    requirements: 'Microsoft PowerPoint for Microsoft 365 with Copilot available through your license and organization settings.',
    installSummary: 'In Copilot, select +, Choose skills, Manage skills, and Add skill. Upload the files or paste the skill.',
  },
  Excel: {
    supportUrl: 'https://support.microsoft.com/en-us/excel/copilot/copilot-in-excel-skills',
    requirements: 'Microsoft Excel with Copilot and the Microsoft Office display language set to English.',
    installSummary: 'In Manage skills, create the OneDrive skills folder and add a matching folder containing SKILL.md.',
  },
  SharePoint: {
    supportUrl: 'https://github.com/pnp/edu-skills/tree/main/skills/sharepoint',
    requirements: 'A Microsoft 365 Copilot agent with access to the SharePoint site, assignment files, and its AgentAssets/Skills folder.',
    installSummary: 'Create a matching folder under AgentAssets/Skills, add SKILL.md, and confirm the agent can access the required SharePoint content.',
  },
};

const previewLabels = {
  'Teaching & Learning': ['Objective', 'Learning activity', 'Check for understanding'],
  'Data & Insights': ['Key measure', 'Trend', 'Recommended review'],
  'Planning & Operations': ['Inputs', 'Proposed plan', 'Conflicts to review'],
  Communication: ['Purpose', 'Key message', 'Next steps'],
  Accessibility: ['Issue found', 'Suggested fix', 'Review result'],
};

const detailContent = {
  'Teaching & Learning': {
    outcomes: [
      'A clear instructional structure aligned to the goal and audience',
      'Editable learning content with directions, examples, and checks for understanding',
      'A review-ready draft that preserves educator judgment and can be adapted before use',
    ],
    moments: ['Planning a new lesson or activity', 'Turning source material into student-ready content', 'Creating a consistent starting point for repeated classroom work'],
  },
  'Data & Insights': {
    outcomes: [
      'A structured view of the source data with key measures and trends',
      'Priority findings that are easy to verify against the original workbook',
      'A review list that supports professional judgment without making decisions for you',
    ],
    moments: ['Preparing for a data review', 'Finding patterns in a recurring export', 'Creating a consistent summary for a team or school leader'],
  },
  'Planning & Operations': {
    outcomes: [
      'An organized working model built from your confirmed inputs and constraints',
      'A proposed plan with unresolved conflicts and assumptions shown clearly',
      'Reusable views that make updates, review, and handoff easier',
    ],
    moments: ['Starting a recurring planning cycle', 'Organizing a complex operational workbook', 'Preparing a proposal for human review and approval'],
  },
  Communication: {
    outcomes: [
      'A clear narrative organized for the intended audience and purpose',
      'Editable content with the key message, evidence, and next steps',
      'A practical first draft that can be reviewed for tone, accuracy, and local context',
    ],
    moments: ['Preparing a staff or student presentation', 'Turning notes into a coherent story', 'Creating a repeatable communication format'],
  },
  Accessibility: {
    outcomes: [
      'A structured review of readability, access, and presentation barriers',
      'Specific suggested changes with the reason for each recommendation',
      'An updated draft that keeps the original learning goal and meaning intact',
    ],
    moments: ['Reviewing content before sharing it', 'Adapting an existing resource for broader access', 'Applying a consistent accessibility check'],
  },
};

const state = {
  search: '',
  role: 'All',
  app: 'All',
  category: 'All',
  sort: 'featured',
  visibleCount: 12,
  runtimeState: null,
};

const elements = {
  grid: document.querySelector('#skill-grid'),
  template: document.querySelector('#skill-card-template'),
  count: document.querySelector('#result-count'),
  search: document.querySelector('#skill-search'),
  role: document.querySelector('#role-filter'),
  app: document.querySelector('#app-filter'),
  category: document.querySelector('#category-filter'),
  sort: document.querySelector('#sort-skills'),
  clear: document.querySelector('#clear-filters'),
  empty: document.querySelector('#empty-state'),
  emptyClear: document.querySelector('#empty-clear'),
  loadMore: document.querySelector('#load-more'),
  dialog: document.querySelector('#skill-dialog'),
  dialogContent: document.querySelector('#dialog-content'),
  dialogClose: document.querySelector('#dialog-close'),
  runtime: document.querySelector('#runtime-state'),
  runtimeTitle: document.querySelector('#runtime-state-title'),
  runtimeMessage: document.querySelector('#runtime-state-message'),
  runtimeRetry: document.querySelector('#runtime-retry'),
};

let lastDialogTrigger = null;

const applyIconSources = (root = document) => {
  root.querySelectorAll('img[data-icon]').forEach((image) => {
    image.src = iconUrls[image.dataset.icon];
  });
};

const matchesFilters = (skill) => {
  const searchableText = [
    skill.title,
    skill.description,
    skill.category,
    skill.app,
    ...skill.audiences,
  ].join(' ').toLowerCase();

  return (
    searchableText.includes(state.search.toLowerCase()) &&
    (state.role === 'All' || skill.audiences.includes(state.role)) &&
    (state.app === 'All' || skill.app === state.app) &&
    (state.category === 'All' || skill.category === state.category)
  );
};

const sortSkills = (skillList) => {
  const sorted = [...skillList];

  if (state.sort === 'az') {
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (state.sort === 'newest') {
    return sorted.sort((a, b) => (b.updated ?? '').localeCompare(a.updated ?? ''));
  }

  return sorted.sort((a, b) => {
    const featuredDifference = Number(b.featured) - Number(a.featured);
    return featuredDifference || (b.updated ?? '').localeCompare(a.updated ?? '');
  });
};

const requiresDecisionReview = (skill) => (
  skill.audiences.includes('Administrator') &&
  ['Data & Insights', 'Planning & Operations'].includes(skill.category)
);

const buildSkillCard = (skill) => {
  const fragment = elements.template.content.cloneNode(true);
  const card = fragment.querySelector('.skill-card');
  const appBadge = fragment.querySelector('.app-badge');
  const icon = fragment.querySelector('.skill-icon img');
  const openButton = fragment.querySelector('.skill-open');
  const sourceLink = fragment.querySelector('.skill-source');

  card.dataset.app = skill.app;
  appBadge.dataset.app = skill.app;
  const productIcon = document.createElement('img');
  productIcon.src = iconUrls[skill.app];
  productIcon.alt = '';
  appBadge.append(productIcon, `Microsoft ${skill.app}`);
  icon.src = iconUrls[skill.icon] ?? iconUrls[categoryIcons[skill.category]] ?? iconUrls.sparkle;
  fragment.querySelector('.skill-category').textContent = categoryLabels[skill.category] ?? skill.category;
  fragment.querySelector('h3').textContent = skill.title;
  fragment.querySelector('.skill-description').textContent = skill.description;
  fragment.querySelector('.trust-note').textContent = requiresDecisionReview(skill)
    ? 'Decision support · Human review required'
    : 'Community skill · Review output before use';

  const audienceContainer = fragment.querySelector('.skill-audiences');
  skill.audiences.forEach((audience) => {
    const pill = document.createElement('span');
    pill.className = 'audience-pill';
    pill.textContent = audience;
    audienceContainer.append(pill);
  });

  openButton.dataset.skillId = skill.id;
  sourceLink.href = skill.sourceUrl;
  sourceLink.setAttribute('aria-label', `View ${skill.title} on GitHub`);
  applyIconSources(fragment);
  return fragment;
};

const renderSkills = () => {
  if (state.runtimeState) {
    elements.grid.hidden = true;
    elements.empty.hidden = true;
    elements.loadMore.hidden = true;
    return;
  }

  const filtered = sortSkills(skills.filter(matchesFilters));
  const visible = filtered.slice(0, state.visibleCount);
  elements.grid.replaceChildren(...visible.map(buildSkillCard));
  elements.grid.hidden = filtered.length === 0;
  elements.empty.hidden = filtered.length !== 0;
  elements.loadMore.hidden = filtered.length <= state.visibleCount;
  elements.count.textContent = `Showing ${visible.length} of ${filtered.length} skills`;
};

const resetFilters = () => {
  state.search = '';
  state.role = 'All';
  state.app = 'All';
  state.category = 'All';
  state.visibleCount = 12;
  elements.search.value = '';
  elements.role.value = 'All';
  elements.app.value = 'All';
  elements.category.value = 'All';
  renderSkills();
};

const downloadSkillStarter = (skill) => {
  const link = document.createElement('a');
  link.href = skill.downloadUrl;
  link.download = 'SKILL.md';
  link.click();
};

const buildOutputPreview = (skill) => {
  const labels = previewLabels[skill.category];

  if (skill.media) {
    const media = skill.media.type === 'video'
      ? `<video controls preload="metadata" poster="${skill.media.poster}" aria-label="${skill.media.alt}"><source src="${skill.media.src}"></video>`
      : `<img src="${skill.media.src}" alt="${skill.media.alt}" loading="lazy" />`;
    return `
      <figure class="output-preview output-preview-media">
        ${media}
        ${skill.media.caption ? `<figcaption>${skill.media.caption}</figcaption>` : ''}
      </figure>
    `;
  }

  if (skill.app === 'SharePoint') {
    return `
      <figure class="output-preview">
        <div class="preview-frame preview-sharepoint" role="img" aria-label="Illustrative SharePoint output for ${skill.title}">
          <div class="preview-app-line">
            <img src="${iconUrls.SharePoint}" alt="" />
            <span>Example SharePoint review output</span>
          </div>
          <strong>${skill.title}</strong>
          <div class="preview-library-content">
            ${labels.map((label, index) => `<span><i aria-hidden="true">${index + 1}</i>${label}</span>`).join('')}
          </div>
        </div>
        <figcaption>Illustrative preview. The finished review depends on the files, permissions, and educator approvals in your SharePoint workflow.</figcaption>
      </figure>
    `;
  }

  if (skill.app === 'PowerPoint') {
    return `
      <figure class="output-preview">
        <div class="preview-frame preview-powerpoint" role="img" aria-label="Illustrative slide output for ${skill.title}">
          <div class="preview-app-line">
            <img src="${iconUrls.PowerPoint}" alt="" />
            <span>Example presentation output</span>
          </div>
          <strong>${skill.title}</strong>
          <div class="preview-slide-content">
            ${labels.map((label, index) => `<span data-index="${index + 1}">${label}</span>`).join('')}
          </div>
        </div>
        <figcaption>Illustrative preview. The finished presentation adapts to your content and existing design.</figcaption>
      </figure>
    `;
  }

  return `
    <figure class="output-preview">
      <div class="preview-frame preview-excel" role="img" aria-label="Illustrative workbook output for ${skill.title}">
        <div class="preview-app-line">
          <img src="${iconUrls.Excel}" alt="" />
          <span>Example workbook output</span>
        </div>
        <strong>${skill.title}</strong>
        <div class="preview-workbook-content">
          <div class="preview-table">
            <b>${labels[0]}</b><b>${labels[1]}</b><b>Status</b>
            <span>84%</span><span>+6%</span><span>Review</span>
            <span>71%</span><span>-2%</span><span>Watch</span>
            <span>92%</span><span>+4%</span><span>On track</span>
          </div>
          <div class="preview-chart" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        </div>
      </div>
      <figcaption>Illustrative preview. The finished workbook adapts to your data and local rules.</figcaption>
    </figure>
  `;
};

const buildDetailPrompt = (skill, instruction) => {
  const topicByApp = {
    Excel: 'this workbook',
    PowerPoint: 'this presentation',
    SharePoint: 'these SharePoint files',
  };
  const topic = topicByApp[skill.app];
  return `${skill.prompt.replace(/\.$/, '')}. ${instruction.replace('{file}', topic)}`;
};

const buildSkillDetailContent = (skill) => {
  const content = detailContent[skill.category];
  const decisionReview = requiresDecisionReview(skill);
  const prompts = [
    skill.prompt,
    buildDetailPrompt(skill, 'Keep the source content unchanged and list anything that needs my review.'),
    buildDetailPrompt(skill, 'Explain the structure you create and flag assumptions before finalizing {file}.'),
  ];
  const stepsByApp = {
    Excel: [
        'Add the skill to your Excel skills folder and enable it in Copilot.',
        'Open the workbook you want to use, then invoke the skill with an @mention.',
        'Review the source mapping, formulas, findings, and any unresolved items before sharing.',
      ],
    PowerPoint: [
        'Add the skill through Manage skills in PowerPoint.',
        'Open the presentation or source material, then invoke the skill with an @mention.',
        'Review the content, slide structure, accessibility, and speaker guidance before presenting.',
      ],
    SharePoint: [
        'Add the skill folder and SKILL.md file under AgentAssets/Skills in the SharePoint location used by your agent.',
        'Confirm the agent can access the required assignment, rubric, and submission files, then invoke the skill.',
        'Review the preview, identity matching, evidence, and proposed actions before approving any changes or exports.',
      ],
  };
  const steps = stepsByApp[skill.app];

  return {
    ...content,
    prompts,
    steps,
    reviewText: decisionReview
      ? 'A qualified person must review the output before it informs student, staffing, scheduling, intervention, or resource decisions.'
      : 'Review the finished output for accuracy, accessibility, tone, and fit before sharing or using it.',
  };
};

const getSkillShareUrl = (skill) => {
  const url = new URL(window.location.href);
  url.searchParams.set('skill', skill.id);
  url.hash = '';
  return url.toString();
};

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.append(textArea);
  textArea.select();
  const copied = document.execCommand('copy');
  textArea.remove();

  if (!copied) {
    throw new Error('The browser did not copy the link.');
  }
};

const shareSkill = async (skill, statusElement) => {
  const url = getSkillShareUrl(skill);

  try {
    if (navigator.share) {
      await navigator.share({
        title: `${skill.title} | Skills for Education`,
        text: skill.description,
        url,
      });
      statusElement.textContent = 'Skill link shared.';
      return;
    }

    await copyText(url);
    statusElement.textContent = 'Skill link copied.';
  } catch (error) {
    if (error.name === 'AbortError') {
      statusElement.textContent = 'Sharing canceled.';
      return;
    }

    statusElement.textContent = 'The link could not be shared. Copy it from the browser address bar.';
  }
};

const openSkillDialog = (skillId, trigger) => {
  const skill = skills.find((item) => item.id === skillId);
  if (!skill) return;
  const guidance = appGuidance[skill.app];
  const detail = buildSkillDetailContent(skill);
  const updatedDate = skill.updated ? new Date(`${skill.updated}T12:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }) : 'Date not provided';

  elements.dialogContent.innerHTML = `
    <article class="detail-page">
      <header class="detail-hero">
        <div class="detail-hero-copy">
          <div class="detail-tags" aria-label="Skill categories">
            <span>${categoryLabels[skill.category]}</span>
            ${skill.audiences.map((audience) => `<span>${audience}</span>`).join('')}
          </div>
          <div class="dialog-app">
            <img class="product-icon" src="${iconUrls[skill.app]}" alt="" />
            Microsoft ${skill.app} skill
          </div>
          <h2 id="dialog-title">${skill.title}</h2>
          <p class="detail-deck">${skill.description}</p>
          <div class="detail-hero-actions">
            <button class="dialog-primary" id="download-skill-starter" type="button">Download SKILL.md</button>
            <button class="dialog-secondary" id="share-skill" type="button">Share this skill</button>
          </div>
          <p class="copy-status" id="action-status" role="status" aria-live="polite"></p>
        </div>
        ${buildOutputPreview(skill)}
      </header>

      <div class="detail-layout">
        <div class="detail-main">
          <section class="detail-section" aria-labelledby="outcomes-title">
            <p class="detail-kicker">Output</p>
            <h3 id="outcomes-title">What this skill produces</h3>
            <ul class="outcome-list">
              ${detail.outcomes.map((outcome) => `<li><span aria-hidden="true"></span><p>${outcome}</p></li>`).join('')}
            </ul>
          </section>

          <section class="detail-section detail-use-section" aria-labelledby="use-title">
            <p class="detail-kicker">Good moments to use it</p>
            <h3 id="use-title">When to use</h3>
            <div class="use-grid">
              ${detail.moments.map((moment, index) => `<div><span>0${index + 1}</span><p>${moment}</p></div>`).join('')}
            </div>
            <h4>Ask Copilot</h4>
            <div class="prompt-list">
              ${detail.prompts.map((prompt) => `<button class="prompt-example" type="button" data-prompt="${prompt.replace(/"/g, '&quot;')}"><span>${prompt}</span><b>Copy</b></button>`).join('')}
            </div>
          </section>

          <section class="detail-section" aria-labelledby="steps-title">
            <p class="detail-kicker">Workflow</p>
            <h3 id="steps-title">How to use it</h3>
            <ol class="detail-steps">
              ${detail.steps.map((step) => `<li><p>${step}</p></li>`).join('')}
            </ol>
          </section>

          <section class="detail-section" aria-labelledby="requirements-title">
            <p class="detail-kicker">Before you begin</p>
            <h3 id="requirements-title">What you need</h3>
            <div class="requirement-grid">
              <div>
                <strong>Product access</strong>
                <p>${guidance.requirements}</p>
              </div>
              <div>
                <strong>Data care</strong>
                <p>Only provide content permitted by your school or institution. Check local privacy, security, accessibility, and AI policies.</p>
              </div>
              <div>
                <strong>Skill package</strong>
                <p>Create a folder named <code>${skill.id}</code> and place the downloaded <code>SKILL.md</code> file inside it.</p>
              </div>
            </div>
          </section>
        </div>

        <aside class="detail-sidebar" aria-label="Skill information and installation">
          <section class="sidebar-card">
            <h3>Skill information</h3>
            <dl class="skill-facts">
              <div><dt>Updated</dt><dd>${updatedDate}</dd></div>
              <div><dt>App</dt><dd>Microsoft ${skill.app}</dd></div>
              <div><dt>Publisher</dt><dd>Education Skills Community</dd></div>
            </dl>
          </section>

          <section class="sidebar-card sidebar-trust">
            <p class="detail-kicker">Community guidance</p>
            <h3>Review before use</h3>
            <p>${detail.reviewText}</p>
          </section>

          <section class="install-card">
            <span class="package-label">SKILL PACKAGE</span>
            <h3>Ready to add</h3>
            <p>${guidance.installSummary}</p>
            <button class="dialog-primary sidebar-download" id="download-skill-sidebar" type="button">Download ${skill.title}</button>
            <a class="setup-link" href="${skill.sourceUrl}" target="_blank" rel="noreferrer">View skill on GitHub <span aria-hidden="true">-&gt;</span></a>
            <a class="setup-link" href="${guidance.supportUrl}" target="_blank" rel="noreferrer">Open Microsoft setup guide <span aria-hidden="true">-&gt;</span></a>
            <p class="dialog-note">This prototype provides a basic valid starter. Review and expand the instructions before use.</p>
          </section>
        </aside>
      </div>
    </article>
  `;
  const actionStatus = elements.dialogContent.querySelector('#action-status');
  const handleDownload = () => {
    downloadSkillStarter(skill);
    actionStatus.textContent = 'SKILL.md starter downloaded.';
  };
  elements.dialogContent.querySelector('#download-skill-starter').addEventListener('click', handleDownload);
  elements.dialogContent.querySelector('#download-skill-sidebar').addEventListener('click', handleDownload);
  elements.dialogContent.querySelector('#share-skill').addEventListener('click', () => {
    shareSkill(skill, actionStatus);
  });
  elements.dialogContent.querySelectorAll('.prompt-example').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await copyText(button.dataset.prompt);
        actionStatus.textContent = 'Example prompt copied.';
      } catch {
        actionStatus.textContent = 'The prompt could not be copied. Select the text and copy it manually.';
      }
    });
  });
  lastDialogTrigger = trigger;
  elements.dialog.showModal();
  document.documentElement.classList.add('dialog-open');
  document.body.classList.add('dialog-open');
  elements.dialogClose.focus();
};

const closeSkillDialog = () => {
  elements.dialog.close();
  document.documentElement.classList.remove('dialog-open');
  document.body.classList.remove('dialog-open');
  window.requestAnimationFrame(() => lastDialogTrigger?.focus());
};

const updateFromControls = () => {
  state.search = elements.search.value.trim();
  state.role = elements.role.value;
  state.app = elements.app.value;
  state.category = elements.category.value;
  state.sort = elements.sort.value;
  state.visibleCount = 12;
  renderSkills();
};

const runtimeMessages = {
  'catalog-loading': {
    title: 'Loading education skills',
    message: 'The skill library is getting ready.',
    error: false,
  },
  'catalog-empty': {
    title: 'No skills are published yet',
    message: 'Check back soon as the education community adds its first skills.',
    error: true,
  },
  'catalog-permission-denied': {
    title: 'You do not have access to this catalog',
    message: 'Ask the site owner for access, then return and try again.',
    error: true,
  },
  'catalog-not-found': {
    title: 'The skill catalog could not be found',
    message: 'The link may have changed. Return to the home page and try again.',
    error: true,
  },
  'catalog-server-error': {
    title: 'The skill library is unavailable',
    message: 'The server could not complete the request. Try again in a moment.',
    error: true,
  },
  'catalog-network-error': {
    title: 'Check your connection',
    message: 'The skill library could not connect. Reconnect and try again.',
    error: true,
  },
  'catalog-timeout': {
    title: 'This is taking longer than expected',
    message: 'The request timed out before the skills could load.',
    error: true,
  },
};

const setRuntimeState = (id, phase) => {
  if (phase === 'inactive' || !runtimeMessages[id]) {
    state.runtimeState = null;
    elements.runtime.hidden = true;
    elements.runtime.classList.remove('is-error');
    renderSkills();
    return;
  }

  const message = runtimeMessages[id];
  const pending = phase === 'pending';
  state.runtimeState = id;
  elements.runtime.hidden = false;
  elements.runtime.classList.toggle('is-error', message.error && !pending);
  elements.runtimeTitle.textContent = pending ? 'Loading education skills' : message.title;
  elements.runtimeMessage.textContent = pending ? 'The skill library is getting ready.' : message.message;
  elements.runtimeRetry.hidden = pending || !message.error;
  renderSkills();

  if (!pending) {
    elements.runtime.focus();
  }
};

const initializeRuntimeStates = () => {
  const runtime = window.__vibeErrorStateRuntime;
  const pending = runtime?.getPending?.();
  const active = runtime?.getActive?.();

  if (pending?.id) {
    setRuntimeState(pending.id, 'pending');
  } else if (active?.id) {
    setRuntimeState(active.id, 'active');
  }

  window.addEventListener('vibe:error-state', (event) => {
    setRuntimeState(event.detail.id, event.detail.phase);
  });
};

document.querySelector('#browse-skills-button').addEventListener('click', () => {
  document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('#contribute-button').addEventListener('click', () => {
  window.open('https://github.com/pnp/edu-skills/blob/main/CONTRIBUTING.md', '_blank', 'noopener,noreferrer');
});

const setupButtons = [...document.querySelectorAll('[data-setup-app]')];
const setupPanels = [...document.querySelectorAll('[data-setup-panel]')];
const setupAnnouncement = document.querySelector('#setup-announcement');
let activeSetupApp = 'PowerPoint';

const selectSetupApp = (app) => {
  activeSetupApp = app;
  setupButtons.forEach((button) => {
    const selected = button.dataset.setupApp === app;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  setupPanels.forEach((panel) => {
    panel.hidden = panel.dataset.setupPanel !== app;
  });
  setupAnnouncement.textContent = `${app} setup instructions selected.`;
};

setupButtons.forEach((button) => {
  button.addEventListener('click', () => selectSetupApp(button.dataset.setupApp));
});

document.querySelectorAll('.walkthrough-download').forEach((button) => {
  button.addEventListener('click', () => {
    const exampleIds = {
      PowerPoint: 'create-differentiated-deck',
      Excel: 'create-school-calendar',
      SharePoint: 'review-assignment-submissions-with-rubric',
    };
    const exampleId = exampleIds[activeSetupApp];
    const exampleSkill = skills.find((skill) => skill.id === exampleId);
    if (exampleSkill) {
      downloadSkillStarter(exampleSkill);
      setupAnnouncement.textContent = `${activeSetupApp} example SKILL.md downloaded.`;
    } else {
      setupAnnouncement.textContent = `${activeSetupApp} example is temporarily unavailable.`;
    }
  });
});

elements.search.addEventListener('input', updateFromControls);
[elements.role, elements.app, elements.category, elements.sort].forEach((control) => {
  control.addEventListener('change', updateFromControls);
});
document.querySelector('#filter-form').addEventListener('submit', (event) => event.preventDefault());

elements.clear.addEventListener('click', () => {
  window.requestAnimationFrame(resetFilters);
});
elements.emptyClear.addEventListener('click', resetFilters);
elements.runtimeRetry.addEventListener('click', () => loadCatalog());

elements.loadMore.addEventListener('click', () => {
  state.visibleCount += 6;
  renderSkills();
});

elements.grid.addEventListener('click', (event) => {
  const trigger = event.target.closest('.skill-open');
  if (trigger) openSkillDialog(trigger.dataset.skillId, trigger);
});

elements.dialogClose.addEventListener('click', closeSkillDialog);
elements.dialog.addEventListener('click', (event) => {
  if (event.target === elements.dialog) closeSkillDialog();
});
elements.dialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeSkillDialog();
});

const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('#nav-links');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('is-open', !expanded);
});

navLinks.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && elements.dialog.open) {
    event.preventDefault();
    closeSkillDialog();
    return;
  }

  if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
    menuButton.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
    menuButton.focus();
  }
});

const loadCatalog = async () => {
  setRuntimeState('catalog-loading', 'pending');

  try {
    const response = await fetch('./catalog.json');
    if (!response.ok) {
      throw new Error(response.status === 404 ? 'catalog-not-found' : 'catalog-server-error');
    }

    const catalog = await response.json();
    skills = catalog.skills ?? [];
    if (skills.length === 0) {
      setRuntimeState('catalog-empty', 'active');
      return;
    }

    document.querySelector('#hero-skill-count').textContent = skills.length;
    document.querySelector('#hero-app-count').textContent = catalog.apps?.length ?? new Set(skills.map((skill) => skill.app)).size;
    setRuntimeState('catalog-loading', 'inactive');

    const linkedSkillId = new URLSearchParams(window.location.search).get('skill');
    if (linkedSkillId && skills.some((skill) => skill.id === linkedSkillId)) {
      openSkillDialog(linkedSkillId, null);
    }
  } catch (error) {
    const stateId = runtimeMessages[error.message] ? error.message : 'catalog-network-error';
    setRuntimeState(stateId, 'active');
  }
};

applyIconSources();
initializeRuntimeStates();
loadCatalog();
