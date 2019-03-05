export default [
    {
        "title": "业务",
        "icon": "ios-paper",
        "path": "/index/Index"
    },
    {
        "title": "生产",
        "icon": "ios-cube",
        "path": "/production",
        "children": [
            {
                "name": "外发订单",
                "path": "2_1"
            },
            {
                "name": "外发打样",
                "path": "2_2"
            },
            {
                "name": "产能监测",
                "path": "2_3"
            },
            {
                "name": "生成任务",
                "path": "/production/productionTask"
            }
        ]
    },
    {
        "title": "数据",
        "icon": "ios-pie",
        "path": "3",
        "children": [
            {
                "name": "实时看板",
                "path": "3_1"
            },
            {
                "name": "动态监测",
                "path": "3_2"
            },
            {
                "name": "统计分析",
                "path": "3_3"
            }
        ]
    },
    {
        "title": "管理",
        "icon": "ios-settings",
        "path": "4",
        "children": [
            {
                "name": "合作工厂",
                "path": "4_1"
            },
            {
                "name": "申请合作",
                "path": "4_2"
            },
            {
                "name": "线上工厂",
                "path": "4_3"
            }
        ]
    }
]