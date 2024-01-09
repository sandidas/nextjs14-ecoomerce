export { }
declare global {
    // ============== 
    // Navigation
    // ============== 

    interface IPrimaryNavigation {
        id: string;
        label: string;
        link: string;
        icon?: any;
        children?: IPrimaryNavigation[];
    };
    interface DashboardNavigationItem {
        id: string;
        label: string;
        link?: string;
        icon?: any;
        children?: DashboardNavigationItem[];
    };
    interface ISidebarItemClientSide {
        id: string;
        label?: string;
        link?: string;
        icon?: any;
        lineBreak?: string;
        breakTitle?: string;
    };
    interface ISidebarItemProps {
        item: ISidebarItem;
        level: number;
        activeItemId?: string;
        setOpened: React.Dispatch<React.SetStateAction<boolean>>;
    };
}