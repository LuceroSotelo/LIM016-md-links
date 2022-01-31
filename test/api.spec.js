import * as apitest from 'C:/Users/lucero sotelo/Documents/LUCERO/LABORATORIA/LIM016/PROYECTOS/LIM016-md-links/src/api.js';
//import fetch from 'node-fetch';

describe('Path exists', () => {
    it('Should be a function', () => {
        expect(typeof apitest.pathExist).toBe('function');
    });
    it('Should return true if path exists', () => {
        expect(apitest.pathExist('src/api.js')).toBeTruthy;
    });
    it('Should return false if path does not exists', () => {
        expect(apitest.pathExist('false-example')).toBeFalsy;
    })
});


describe('Absolute path', () => {
    it('Should be a function', () => {
        expect(typeof apitest.pathIsAbsolute).toBe('function');
    });
    it('Should result true if path is absolute', () => {
        expect(apitest.pathIsAbsolute('/Users/lucero sotelo/Documents/LUCERO/LABORATORIA/LIM016/PROYECTOS/LIM016-md-links/')).toBeTruthy;
    });
    it('should return false if path is not absoute', () => {
        expect(apitest.pathIsAbsolute('false-example')).toBeFalsy;
    });
})

describe('Convert to absolute path', () => {
    it('Should be a function', () => {
        expect(typeof apitest.convertTopathAbsolute).toBe('function');
    });
    it('Should return an absolute path', () => {
        expect(apitest.convertTopathAbsolute('linksprueba.md')).toBe('C:\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\linksprueba.md')//Por qué debe tener esta estructura?
    });
})


describe('Check if path is a directory', () => {
    it('Should be a function', () => {
        expect(typeof apitest.pathIsDirectory).toBe('function');
    });
    it('Should result true if path is a directory', () => {
        expect(apitest.pathIsDirectory('/Users/lucero sotelo/Documents/LUCERO/LABORATORIA/LIM016/PROYECTOS/LIM016-md-links/')).toBeTruthy;
    });
    it('should return false if path is not a directory', () => {
        expect(apitest.pathIsDirectory('linksprueba.md')).toBeFalsy;
    });
})


describe('Array of all .md files', () => {
    it('Should be a function', () => {
        expect(typeof apitest.getMdArr).toBe('function');
    });
    it('Should return an array of absolute path of all .md directory files', () => {
        expect(apitest.getMdArr('c_01')).toEqual([
            'C:\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md'
        ])
    });
})


describe('links info', () => {
    it('Should be a function', () => {
        expect(typeof apitest.getArraysOfObjectsWithLinks).toBe('function');
    });
    it('Should return an array of objects with information for each link', () => {
        const output = [
            {
                href: 'https://es.wikipedia.org/wiki/Markdown',
                text: 'Markdown',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md'
            },
            {
                href: 'https://www.amazon.com/error',
                text: 'No',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md'
            },
            {
                href: 'https://www.google.com/',
                text: 'Google',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md'
            },
            {
                href: 'https://jestjs.io/docs/ecmascript-modules',
                text: 'HolaJ',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md'
            },
            {
                href: 'https://www.revistacomunicar.com/',
                text: 'Revista Comunicar',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md'
            }

        ]
        expect(apitest.getArraysOfObjectsWithLinks((apitest.getMdArr('/Users/lucero sotelo/Documents/LUCERO/LABORATORIA/LIM016/PROYECTOS/LIM016-md-links/c_01')))).toEqual(output);
    })
})


describe('Links status', () => {
    it('Should be a function', () => {
        expect(typeof apitest.statusHttp).toBe('function');
    });
    it('Should return an array of objects with information and status for each link', async () => { //no retorna array
        const input = [
            {
                href: 'https://es.wikipedia.org/wiki/Markdown',
                text: 'Markdown',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md'
            },
            {
                href: 'https://www.amazon.com/error',
                text: 'No',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md'
            },
            {
                href: 'https://www.google.com/',
                text: 'Google',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md'
            },
            {
                href: 'https://jestjs.io/docs/ecmascript-modules',
                text: 'HolaJ',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md'
            },
            {
                href: 'https://www.revistacomunicar.com/',
                text: 'Revista Comunicar',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md'
            }
        ];

        const output = [
            {
                href: 'https://es.wikipedia.org/wiki/Markdown',
                text: 'Markdown',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md',
                status: 200,
                ok: 'ok'
            },
            {
                href: 'https://www.amazon.com/error',
                text: 'No',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md',
                status: 404,
                ok: 'fail'
            },
            {
                href: 'https://www.google.com/',
                text: 'Google',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md',
                status: 200,
                ok: 'ok'
            },
            {
                href: 'https://jestjs.io/docs/ecmascript-modules',
                text: 'HolaJ',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md',
                status: 200,
                ok: 'ok'
            },
            {
                href: 'https://www.revistacomunicar.com/',
                text: 'Revista Comunicar',
                file: '\\Users\\lucero sotelo\\Documents\\LUCERO\\LABORATORIA\\LIM016\\PROYECTOS\\LIM016-md-links\\c_01\\c_02\\c_03\\c_04\\linksprueba04.md',
                status: 200,
                ok: 'ok'
            }

        ];
        const e = await apitest.statusHttp(input);
        expect(e).toEqual(output);
    });
})