import React from 'react';
import {PageHeader,Dropdown,Menu,Space,Button} from 'antd'
import { DownOutlined } from '@ant-design/icons';
import './hf.css'
const Header=()=>{
    const menu=(
        <Menu items={[
            {
                key:'1',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                      1st menu item
                    </a>
                  ), 
            },
            {
                key:'2',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                      2nd menu item
                    </a>
                  ),
            },
            {
                key:'3',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                      3rd menu item
                    </a>
                  ),
            }
        ]}/>
    )
    return(
        <PageHeader 
            title='header'
            subTitle='pageHeader'
            extra={[
                <Dropdown overlay={menu}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            menu1
                            <DownOutlined /> 
                        </Space>
                        </a>
                </Dropdown>,
                <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        menu2
                        <DownOutlined />
                    </Space>
                    </a>
            </Dropdown>,
            <Button>111</Button>
            ]}
        />
    )
}

export {Header}

