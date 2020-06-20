export const sidebarSections = {
    mainSection: {
        el: '#sidebar',
        items: [
            {
                report: 1,
                route: "/contacts",
                childMsg: 'Contacts' 
            },
            {
                report: 2,
                route: "/quarterlyReports",
                childMsg: 'Quarterly Reports' 
            },
            {
                report: 3,
                route: "/contactGroups",
                childMsg: 'Groups' 
            },
        ]
    },
    importExportSection: {
        el: '#sidebar',
        items: [
            {
                report: 2,
                route: "/fake",
                childMsg: 'Import' 
            },
            {
                report: 3,
                route: "/fake",
                childMsg: 'Export' 
            },
        ]
    }
};