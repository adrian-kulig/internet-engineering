import {Offer} from '.'

let fffer

beforeEach(async () => {
    fffer = await Offer.create({name: 'test', location: 'test', description: 'test'})
})

describe('view', () => {
    it('returns simple view', () => {
        const view = fffer.view()
        expect(typeof view).toBe('object')
        expect(view.id).toBe(fffer.id)
        expect(view.name).toBe(fffer.name)
        expect(view.location).toBe(fffer.location)
        expect(view.description).toBe(fffer.description)
        expect(view.createdAt).toBeTruthy()
        expect(view.updatedAt).toBeTruthy()
    })

    it('returns full view', () => {
        const view = fffer.view(true)
        expect(typeof view).toBe('object')
        expect(view.id).toBe(fffer.id)
        expect(view.name).toBe(fffer.name)
        expect(view.location).toBe(fffer.location)
        expect(view.description).toBe(fffer.description)
        expect(view.createdAt).toBeTruthy()
        expect(view.updatedAt).toBeTruthy()
    })
})
