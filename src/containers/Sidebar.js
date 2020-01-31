import React from "react";
import "../styles/mainstyles.css";
import { Icon, Menu, Button} from "antd";
function Sidebar (page_name) {
    if (page_name = 'Metrics'){
        key = 2;
    }
    else {
        key = 1;
    };
    render () ;{
   return (
       <div className="Sidebar"> 
        <br/>
        <h1>BlueBook</h1>
        <Menu
        defaultSelectedKeys={[key]}
        mode = "vertical">
            <Menu.Item key="1" align= 'left'>
                <Icon type="contacts" />
                Patient Listing
            </Menu.Item>
            <Menu.Item key="2" align= 'left'>
                <Icon type="monitor" />
                Metrics
            </Menu.Item>
        </Menu>
        <div className="LogoutButton">
            <Button type="danger" ghost>
            Logout
            </Button>
        </div>
</div> )
    }
    
}

export default Sidebar();