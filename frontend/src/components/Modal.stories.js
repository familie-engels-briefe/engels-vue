import Modal from './Modal'

export default {
    title: 'Page/Modal',
    component: Modal,
}

const Template = () => ({
    components: {
        Modal
    },
    template: `
        <Modal :show="true">
            <template v-slot:header>Friedrich Engels</template>
            <template v-slot:content>
                <p>Friedrich Engels (* 28. November 1820 in Barmen (heute Stadtteil von Wuppertal) in der preußischen Provinz Jülich-Kleve-Berg; † 5. August 1895 in London) war ein deutscher Philosoph, Gesellschaftstheoretiker, Historiker, Journalist und kommunistischer Revolutionär. Darüber hinaus war er ein erfolgreicher Unternehmer in der Textilindustrie. Er entwickelte gemeinsam mit Karl Marx die heute als Marxismus bezeichnete Gesellschafts- und Wirtschaftstheorie.</p>

                <p>Engels beschäftigte sich schon vor Marx mit der Kritik der politischen Ökonomie. Die 1844 erschienenen Umrisse zu einer Kritik der Nationalökonomie wurden für Marx zum Ausgangspunkt seiner eigenen Arbeiten. Bereits 1845 erschien die gemeinsame Schrift Die heilige Familie, mit der Engels und Marx begannen, ihr Theorieverständnis zu formulieren. Im Jahr 1848 verfassten sie im Auftrag des Bundes der Kommunisten das Kommunistische Manifest. </p>
            </template>
        </Modal>`
})

export const Default = Template.bind({})
Default.storyName = 'Default'
