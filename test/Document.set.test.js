import { Document, firebase } from './init';

test('set field', async () => {
	expect.assertions(2);
	const doc = new Document('artists/FooFighters');
	await doc.set({
    memberCount: 4
	});
	expect(doc.data.memberCount).toBeUndefined();
	await doc.fetch();
	expect(doc.data.memberCount).toBe(4);
});

test('set field with deep object', async () => {
	expect.assertions(3);
	const doc = new Document('artists/FooFighters');
	await doc.set({
    meta: {
      memberCount: 4
    }
	});
	expect(doc.data.meta).toBeUndefined();
	await doc.fetch();
	expect(doc.data.meta).not.toBeUndefined();
	expect(doc.data.meta.memberCount).toBe(4);
});

test('set or merge field with deep object', async () => {
	expect.assertions(3);
	const doc = new Document('artists/FooFighters');
	await doc.set({
    meta: {
      memberCount: 4
    }
	}, {merge: true});
	expect(doc.data.meta).toBeUndefined();
	await doc.fetch();
	expect(doc.data.meta).not.toBeUndefined();
	expect(doc.data.meta.memberCount).toBe(4);
});
