export interface ServiceFeature {
  text: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'mobile' | 'website' | 'admin' | 'software' | 'cloud' | 'design';
  category: 'core' | 'extended';
  colorTheme: 'blue' | 'green' | 'azure' | 'gradient';
  features: string[];
  techStack: string[];
  badge?: string;
  linkText?: string;
}
