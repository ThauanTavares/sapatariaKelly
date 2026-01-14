const defaultConfig = {
  company_name: 'Sapataria Kelly',
  owner_name: 'Josué Ferreira',
  hero_title: 'Tradição e Qualidade',
  hero_subtitle: 'em cada costura',
  about_text: 'A Sapataria Kelly é um estabelecimento tradicional no bairro Cajuru, em Curitiba, dedicado à arte de cuidar de calçados. Com mais de três décadas de experiência, oferecemos serviços de conserto, restauração e manutenção com a qualidade e atenção que seus sapatos merecem.',
  address: 'R. Eng. Costa Barros, 1788 - Cajuru, Curitiba - PR, 82940-010',
  phone: '(41) 3226-3034',
  background_color: '#fafaf9',
  surface_color: '#ffffff',
  text_color: '#78350f',
  primary_action_color: '#78350f',
  secondary_action_color: '#d97706'
};

async function onConfigChange(config) {
  // Update text content with partial Red Color for Kelly
  const companyName = config.company_name || defaultConfig.company_name;
  // Replace "Kelly" with Red Kelly span
  const coloredCompanyName = companyName.replace('Kelly', '<span class="text-red-600">Kelly</span>');
  
  const navCompany = document.getElementById('nav-company');
  const footerCompany = document.getElementById('footer-company');

  if (navCompany) navCompany.innerHTML = coloredCompanyName;
  if (footerCompany) footerCompany.innerHTML = coloredCompanyName;
  
  if (document.getElementById('hero-title')) document.getElementById('hero-title').textContent = config.hero_title || defaultConfig.hero_title;
  if (document.getElementById('hero-subtitle')) document.getElementById('hero-subtitle').textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
  if (document.getElementById('about-text')) document.getElementById('about-text').textContent = config.about_text || defaultConfig.about_text;
  if (document.getElementById('owner-name')) document.getElementById('owner-name').textContent = config.owner_name || defaultConfig.owner_name;
  
  const address = config.address || defaultConfig.address;
  const addressParts = address.split(' - ');
  const addressElement = document.getElementById('address-text');
  
  if (addressElement) {
    if (addressParts.length >= 2) {
      addressElement.innerHTML = `${addressParts[0]}<br>${addressParts[1]}`;
    } else {
      addressElement.textContent = address;
    }
  }
  
  if (document.getElementById('phone-text')) document.getElementById('phone-text').textContent = config.phone || defaultConfig.phone;
}

function mapToCapabilities(config) {
  return {
    recolorables: [
      {
        get: () => config.background_color || defaultConfig.background_color,
        set: (value) => { config.background_color = value; window.elementSdk.setConfig({ background_color: value }); }
      },
      {
        get: () => config.surface_color || defaultConfig.surface_color,
        set: (value) => { config.surface_color = value; window.elementSdk.setConfig({ surface_color: value }); }
      },
      {
        get: () => config.text_color || defaultConfig.text_color,
        set: (value) => { config.text_color = value; window.elementSdk.setConfig({ text_color: value }); }
      },
      {
        get: () => config.primary_action_color || defaultConfig.primary_action_color,
        set: (value) => { config.primary_action_color = value; window.elementSdk.setConfig({ primary_action_color: value }); }
      },
      {
        get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
        set: (value) => { config.secondary_action_color = value; window.elementSdk.setConfig({ secondary_action_color: value }); }
      }
    ],
    borderables: [],
    fontEditable: undefined,
    fontSizeable: undefined
  };
}

function mapToEditPanelValues(config) {
  return new Map([
    ['company_name', config.company_name || defaultConfig.company_name],
    ['owner_name', config.owner_name || defaultConfig.owner_name],
    ['hero_title', config.hero_title || defaultConfig.hero_title],
    ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
    ['about_text', config.about_text || defaultConfig.about_text],
    ['address', config.address || defaultConfig.address],
    ['phone', config.phone || defaultConfig.phone]
  ]);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}