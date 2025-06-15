export interface TableHeader {
  title: string;
  field: string;
  fieldImage?: string;
  fieldDescription?: string;
  type: 'text' | 'number' | 'text-image' | 'badge' | 'custom';
}
