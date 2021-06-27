import fs from 'fs';
import axios from 'axios';
import jsyaml from 'js-yaml';
import prettier from 'prettier';
import { minify } from 'terser';

const file_max = './dist/iconset.js'
const file_min = './dist/iconset.min.js'

const address = 'https://github.com/FortAwesome/Font-Awesome/raw/5.1.0/advanced-options/metadata/icons.yml'


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

    let jsfile = ' var ICON_SET = ' + JSON.stringify(icons)
    let formatted = prettier.format(jsfile, { parser: 'babel', printWidth: 2000 })
    let minified = await minify(formatted);

    await fs.promises.writeFile(file_max, formatted)
    await fs.promises.writeFile(file_min, minified.code)
}


parser();


/* FontAwesome version */