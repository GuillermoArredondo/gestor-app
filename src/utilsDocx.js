import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { saveAs } from 'file-saver';


export const generarWord = (factura, listaProductos) => {
    console.log('generarWord: ', listaProductos);
    const doc = new Document({
        sections: 
        [
            {
                properties: {},
                children: montarArray(factura, listaProductos),
            },
        ],
    });

    Packer.toBlob(doc).then( blob => {
        saveAs(blob, 'Factura ' + factura.fecha);
    })
}

const montarArray = (factura, listaProductos) => {
    let parrafos = [];

    parrafos = 
    [
        new Paragraph({
            alignment: AlignmentType.RIGHT,
            children:[
                new TextRun({
                    text: factura.fecha,
                    size: 24,
                })
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: 'Instalaciones eléctricas Jesús',
                    size: 24,
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: 'C/ Capellán Marcelo Colino N.º 5 Casa 19',
                    size: 24,
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: 'Ciudad Real',
                    size: 24,
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: 'CIF: E13472022',
                    size: 24,
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: 'Tlf 662 338 727 - 678 630 114',
                    size: 24,
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: 'jesus.instalaciones@hotmail.com',
                    size: 24,
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: '',
                    size: 24,
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: factura.titulo,
                    size: 24,
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: factura.desc,
                    size: 24,
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: '',
                    size: 24,
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: '',
                    size: 24,
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: 'CANTIDAD \t\t\t\t\t ',
                    size: 24,
                }),
                new TextRun({
                    text: 'PRECIO \t\t\t\t ',
                    size: 24,
                }),
                new TextRun({
                    text: 'TOTAL',
                    size: 24,
                }),
            ]
        })
    ]

    listaProductos.forEach(prod => {
        const p = new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: prod.titulo + ': ' + prod.desc,
                    size: 24,
                }),
            ]
        })
        parrafos.push(p);

        const p2 = new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: prod.cantidad + ' \t\t\t\t\t\t ',
                    size: 24,
                }),
                new TextRun({
                    text: prod.precio + '€ \t\t\t\t\t ',
                    size: 24,
                }),
                new TextRun({
                    text: prod.precioTotal + '€',
                    size: 24,
                }),
            ]
        })
        parrafos.push(p2);
        const vacio = new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: '',
                    size: 24,
                }),
            ]
        })
        parrafos.push(vacio);
    });

    const vacio = new Paragraph({
        alignment: AlignmentType.LEFT,
        children:[
            new TextRun({
                text: '',
                size: 24,
            }),
        ]
    })
    parrafos.push(vacio);
    parrafos.push(vacio);
    parrafos.push(vacio);

    const total = new Paragraph({
        alignment: AlignmentType.RIGHT,
        children:[
            new TextRun({
                text: 'Total: \t\t ' + factura.total + '€' + '\t\t',
                size: 24,
            }),
        ]
    })
    parrafos.push(total);

    const iva = new Paragraph({
        alignment: AlignmentType.RIGHT,
        children:[
            new TextRun({
                text: 'IVA 21%: \t ' + factura.iva + '€' + '\t',
                size: 24,
            }),
        ]
    })
    parrafos.push(iva);

    const totalIva = new Paragraph({
        alignment: AlignmentType.RIGHT,
        children:[
            new TextRun({
                text: 'Total + IVA: \t ' + factura.totalIva + '€' + '\t',
                size: 24,
            }),
        ]
    })
    parrafos.push(totalIva);

    return parrafos;    

}