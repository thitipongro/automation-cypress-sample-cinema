const url = 'https://www.sfcinemacity.com'
const todayDate = Cypress.moment().format('DD MMM YYYY')
const nowTime = Cypress.moment().format('HH:mm')
const expectTime = Cypress.moment().add(6, 'hours').format('HH:mm')
const nameMovie = '1917'
const locationMovie = 'SFX CINEMA Central Rama 9'

describe('Check time movie', () => {
    it('เรียกหน้าเว็ปไซค์', () => {
        cy.visit(url)
    })
    it('เปลี่ยนภาษา', () => {
        cy.get('[class="lang-switcher"]>li').each($el => {
            if ($el.get(0).innerText === 'ENG') {
                cy.wrap($el)
                .click()
            }
        })
        cy.get('[class="top-navigation"]').contains('Login/Sign up')
    })
    it('เลือกโรงภาพยนตร์', () => {
        cy.get('[class="button dropdown-button"]')
            .contains('Select Cinema')
            .click()
        cy.contains(locationMovie)
            .click()
    })
    it('เลือกภาพยนตร์', () => {
        cy.get('[class="button dropdown-button"]')
            .contains('All Movie')
            .click()
        cy.get('h3[class="name"]')
            .contains(nameMovie)
            .click()
        cy.get('[class="button showtime-button"]')
            .contains('Showtime')
            .click()
    })
    it('ตรวจสอบวันที่ปัจจุบัน', () => {
        cy.get('[class="selected"]>p')
            .contains(todayDate)
    })
    it('ตรวจสอบรอบฉาย', () => {
        cy.get('[class="showtime-list"]>div')
            .children()
            .children()
            .children()
            .children()
    })
    // it('console log ดูเวลา', () => {
    //     cy.get('[class="time-list"]>li').each($list => {
    //         console.log($list.get(0).innerText)
    //     })
    // })
    it('เลือกรอบฉายที่ไม่เกิน 6 ชั่วโมง', () => {
        cy.get('[class="time-list"]>li').each($list => {
            if (
                $list.get(0).innerText >= nowTime &&
                $list.get(0).innerText <= expectTime
            ) {
                cy.wrap($list.children()).click()
            }
        })
    })
    it('ตรวจสอบหน้าจอเลือกที่นั่ง', () => {
        cy.contains('Selected Seat')
    })
})