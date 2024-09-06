import React, { useState, useEffect } from 'react';
import './RibbonMenu.css';
import HeaderButton from '../HeaderButton/HeaderButton';

function RibbonMenu(props) {

  const menus = [{
    id: 'menu_file',
    title: 'File',
    groups: [{
      title: 'Import',
      items: [{
        icon: 'grid_on',
        text: 'CSV',
        id: 'import_csv'
      },{
        icon: 'data_object',
        text: 'JSON',
        id: 'import_json'
      }]
    },{
      title: 'Export',
      items: [{
        icon: 'grid_on',
        text: 'CSV',
        id: 'export_csv'
      },{
        icon: 'html',
        text: 'HTML',
        id: 'export_html'
      },{
        icon: 'data_object',
        text: 'JSON',
        id: 'export_json'
      }]
    }]
  },{
    id: 'menu_structure',
    title: 'Structure',
    groups: [{
      title: 'Column',
      items: [{
        icon: 'keyboard_double_arrow_left',
        text: 'Start',
        id: 'add_column_start'
      },{
        icon: 'keyboard_arrow_left',
        text: 'Left',
        id: 'add_column_left'
      },{
        icon: 'keyboard_arrow_right',
        text: 'Right',
        id: 'add_column_right'
      },{
        icon: 'keyboard_double_arrow_right',
        text: 'End',
        id: 'add_column_end'
      },{
        icon: 'delete',
        text: 'Delete',
        id: 'delete_column'
      },{
        icon: 'join',
        text: 'Join',
        id: 'join_column'
      }]
    },{
      title: 'Row',
      items: [{
        icon: 'keyboard_double_arrow_up',
        text: 'Start',
        id: 'add_row_begin'
      },{
        icon: 'keyboard_arrow_up',
        text: 'Up',
        id: 'add_row_up'
      },{
        icon: 'keyboard_arrow_down',
        text: 'Down',
        id: 'add_row_down'
      },{
        icon: 'keyboard_double_arrow_down',
        text: 'End',
        id: 'add_row_end'
      },{
        icon: 'delete',
        text: 'Delete',
        id: 'delete_row'
      }]
    }]
  },{
    id: 'menu_data',
    title: 'Data',
    groups: [{
      title: 'Normalization',
      items: [{
        icon: 'uppercase',
        text: 'Uppercase',
        id: 'normalization_uppercase'
      },{
        icon: 'lowercase',
        text: 'Lowercase',
        id: 'normalization_lowercase'
      },{
        icon: 'space_bar',
        text: 'Trim',
        id: 'normalization_trim'
      },{
        icon: 'match_case',
        text: 'Capitalize',
        id: 'normalization_capitalize'
      }]
    },{
      title: 'Validation',
      items: [{
        icon: 'email',
        text: 'Email',
        id: 'validation_email'
      },{
        icon: 'tag',
        text: 'Number',
        id: 'validation_number'
      },{
        icon: 'serif',
        text: 'Alpha',
        id: 'validation_alpha'
      },{
        icon: 'serif',
        text: 'AlphaNum',
        id: 'validation_alfanumeric'
      }]
    },{
      title: 'Fill',
      items: [{
        icon: 'format_list_numbered',
        text: 'Incremental',
        id: 'fill_column_numbered'
      },{
        icon: 'radio_button_checked',
        text: 'Fixed value',
        id: 'fill_fixed_value'
      }]
    }]
  /*},{
    id: 'menu_chart',
    title: 'Charts',
    groups: [{
      title: 'Charts',
      items: [{
        icon: 'pie_chart',
        text: 'Pie',
        id: 'chart_pie'
      },{
        icon: 'finance',
        text: 'Bars',
        id: 'chart_bars'
      },{
        icon: 'show_chart',
        text: 'Line',
        id: 'chart_line'
      }]
    }]*/
  }];

  const onClickEvent = (id) => {
    if (props.clickButton) {
      props.clickButton(id);
    }
  };

  const [selectedValue, setSelectedValue] = useState('menu_file');

  const onRadioChange = (event) => {
    setSelectedValue(event.target.id);
  };

  return (
    <div id="ribbon_bar">
      {menus.map((menu, index) => (
        <span>
          <input type="radio" name="menu" id={menu.id} onChange={onRadioChange} checked={menu.id===selectedValue} />
          <label for={menu.id}>{menu.title}</label>
          <section>
            <div>
            
            {menu.groups.map((group, j) => (
              <main>

              {group.items.map((item, k) => (
                <HeaderButton onClick={() => onClickEvent(item.id)} icon={item.icon} text={item.text} />
              ))}
              <footer>{group.title}</footer>
              </main>
            ))}

            
            </div>
          </section>
          </span>
      ))}
    </div>
  );
}

export default RibbonMenu;
