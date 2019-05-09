/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import Batch from '../../../src/model/batch';
import Operation from '../../../src/model/operation/operation';

describe( 'Operation', () => {
	it( 'should save its base version', () => {
		const op = new Operation( 4 );

		expect( op.baseVersion ).to.equal( 4 );
	} );

	describe( 'isDocumentOperation', () => {
		it( 'operation is a document operation if it has base version set', () => {
			const op = new Operation( 0 );

			expect( op.isDocumentOperation ).to.be.true;
		} );

		it( 'operation is not a document operation if base version is null', () => {
			const op = new Operation( null );

			expect( op.isDocumentOperation ).to.be.false;
		} );
	} );

	describe( 'is()', () => {
		let operation;

		before( () => {
			operation = new Operation( null );
		} );

		it( 'should return true for all valid names of operation', () => {
			expect( operation.is( 'operation' ) ).to.be.true;
			expect( operation.is( 'model:operation' ) ).to.be.true;
		} );

		it( 'should return false for invalid parameters', () => {
			expect( operation.is( 'operation:attribute' ) ).to.be.false;
			expect( operation.is( 'model:operation:insert' ) ).to.be.false;
			expect( operation.is( 'noOperation' ) ).to.be.false;
			expect( operation.is( 'detachOperation' ) ).to.be.false;
			expect( operation.is( 'rootAttributeOperation' ) ).to.be.false;
			expect( operation.is( 'model:operation:rootAttribute' ) ).to.be.false;
		} );
	} );

	describe( 'toJSON', () => {
		it( 'should create proper json object #1', () => {
			const op = new Operation( 4 );

			const serialized = op.toJSON();

			expect( serialized ).to.deep.equal( {
				__className: 'Operation',
				baseVersion: 4
			} );
		} );

		it( 'should create proper json object #1', () => {
			const op = new Operation( 4 );
			const batch = new Batch();
			batch.addOperation( op );

			const serialized = op.toJSON();

			expect( serialized ).to.deep.equal( {
				__className: 'Operation',
				baseVersion: 4
			} );
		} );
	} );

	describe( 'fromJSON', () => {
		it( 'should create proper Operation from json object', () => {
			const op = new Operation( 4 );

			const serialized = op.toJSON();
			const deserialized = Operation.fromJSON( serialized );

			expect( deserialized ).to.deep.equal( op );
		} );
	} );
} );
