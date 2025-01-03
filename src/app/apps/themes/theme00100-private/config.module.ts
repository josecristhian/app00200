export const TEMPLATE_SETTINGS = {
    main: {
        useChkBlock: true
    },
    topbar: {
        background_color: 'white',
        box_shadow: '0 0 35px 0 rgba(154, 161, 171, 0.15)',
        border_bottom: '1px solid #DEE4E8',
        padding_left: '1rem',
        admin_logo: 'assets/waicato/img/admin.png',
        admin_logo_height: '50', // px      
        show_user: true,
        show_tools: true,
            show_tools_back: true,
            show_tools_forward: true,
            show_tools_refresh: true,
            show_tools_home: true,
            show_tools_fullscreen: true,
        show_logo_on_mobile: true,
        show_sidebar_toggle: true // ok
    },
    sidebar: {
        general: {
            width: '200px',
            background_color: '#191970'
        },
        logo: {
            show: true,            
            admin_logo: 'assets/waicato/img/admin.png',
            admin_logo_height: '50', // px
            text: 'waicato.com',
            text_size: '20px',
            text_color: 'white',
            text_shadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
        },
        profile: {
            show: true,
            show_picture: true,
            show_name: true,
            show_tenant: true,
        },
        footer: {
            color: '#f2f4f4',
            text: '<i>2025 © Waicato</i>'
        }
    }
};
