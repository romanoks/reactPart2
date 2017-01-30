import * as fs from 'fs';
import { sync as globSync } from 'glob';
import { sync as mkdirpSync } from 'mkdirp';

const filePattern = './src/**/messages/';
const outputLanguageDataDir = './src/components/I18nProvider/translations/';

const combineMessages = (filePattern) => {
    return globSync(filePattern)
        .map((filename) => fs.readFileSync(filename, 'utf8'))
        .map((file) => JSON.parse(file))
        .reduce((collection, descriptors) => {
            descriptors.forEach(({ id, defaultMessage }) => {
                if (collection.hasOwnProperty(id)) {
                    throw new Error(`Duplicate message id: ${id}`);
                }
                collection[id] = defaultMessage;
            });

            return collection;
        }, {});
}

mkdirpSync(outputLanguageDataDir);

['en.json', 'ru.json'].map((fileName) => {
    const messages = combineMessages(`${filePattern}${fileName}`);
    fs.writeFileSync(`${outputLanguageDataDir}${fileName}`, JSON.stringify(messages, null, 2));
})

