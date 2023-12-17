export interface ToolbarButtonConfig {
  text: string;
  click: () => void;
  enabled?: () => boolean;
}