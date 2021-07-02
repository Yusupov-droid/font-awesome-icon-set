import fs from 'fs';
import axios from 'axios';
import jsyaml from 'js-yaml';
import prettier from 'prettier';


const file_max = './src/iconset.js'

const address = 'https://github.com/FortAwesome/Font-Awesome/raw/5.6.3/metadata/icons.yml'


let parser = async () => {

    let icons = [];
    let respon = await axios(address)
    let parsed = jsyaml.load(respon.data)

    Object.keys(parsed).forEach((item) => {
        let icon = 'fa-' + item;
        let element = parsed[item];

        element.styles.forEach(type => {
            switch (type) {
                case "solid":
                    icons.push(
                        {
                            value: 'fas ' + icon,
                            search: element.search.terms
                        }
                    )
                    break;

                case "brands":
                    icons.push(
                        {
                            value: 'fab ' + icon,
                            search: element.search.terms
                        }
                    )

                    break;

                case "regular":
                    icons.push(
                        {
                            value: 'far ' + icon,
                            search: element.search.terms
                        }
                    )

                    break;

                case "light":
                    icons.push(
                        {
                            value: 'fal ' + icon,
                            search: element.search.terms
                        }
                    )
                    break;
            }
        });


    });

    let jsfile = ' export default ' + JSON.stringify(icons)
    let formatted = prettier.format(jsfile, { parser: 'babel', printWidth: 2000 })

    await fs.promises.writeFile(file_max, formatted)

}


parser();


/* FontAwesome version */