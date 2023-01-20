import * as ApiTypes from "./api.types";

type HandleClick = (
  nodeData: SecondaryNodeData,
  imageSrc: string,
  type?: string
) => void;

interface ShowContent {
  line1: string;
  line2: string;
}

export interface NodeContentProps {
  showContent: ShowContent;
  primaryHovering: boolean;
}

export interface PrimaryNodeProps {
  primarySize?: number;
  primaryHovering?: boolean;
  showContent?: ShowContent | {};
  alt: string;
  imageSrc: string;
  setShowContent: React.Dispatch<React.SetStateAction<string>>;
  content: ShowContent | undefined;
}

export interface SecondaryNodeProps extends PrimaryNodeProps {
  index: number;
  secondarySize: number;
  totalCount: number;
  imageType: string;
  clickHandler: HandleClick;
}

export interface ConnectedNodeProps {
  primaryImage: string;
  secondaryNodeArray: [];
  clickHandler: HandleClick;
  primarySize: number;
  secondarySize: number;
  primaryContent: ShowContent | undefined;
  primaryType: string;
}

export interface ConnectedNodeContainerProps {
  selectedDataList: [];
  secondaryNodeClickHandler: HandleClick;
  secondaryNodeFilter: string;
  connectionsLoading: boolean;
  targetName: string;
}

export interface SecondaryNodeData
  extends ApiTypes.PersonCast,
    ApiTypes.MovieCast {}

export interface ListItemProps {
  imageSrc: string;
  size: number;
  alt: string;
  clickHandler: HandleClick;
}
