sap.ui.define([], function() {
	"use strict";

	// utilizado como relatórios - podendo verificar o detalhes dos testes
	QUnit.begin(function(details){
		console.log('begin: ', details);
	});
	QUnit.done(function(details){
		console.log('done: ', details);
	});
	QUnit.moduleStart(function(details){
		console.log('moduleStart: ', details);
	});
	QUnit.moduleDone(function(details){
		console.log('moduleDone: ', details);
	});

	// Async
	QUnit.module("Async - Test AJAX", {
		beforeEach: function (assert) {
      assert.ok(true, "Inicio do Teste");
		},
		afterEach: function (assert) {
			assert.ok(true, "Final do Teste");
		}		
	});
  QUnit.only("Async", function(assert) { 
		let hasJQuery = window.jQuery ? true : false;
    assert.ok(hasJQuery, "Tem Lib JQuery");

		if (hasJQuery) {
			var cep = '14780350';
			var url = 'https://viacep.com.br/ws/' + cep.replace(/[^0-9]/g, '') + '/json/';
			console.log('url', url);
			var done = assert.async(1);
			var cepEsperado = {
				"cep": "14780-350",
				"logradouro": "Avenida 29",
				"complemento": "até 1498/1499",
				"bairro": "Centro",
				"localidade": "Barretos",
				"uf": "SP",
				"ibge": "3505500",
				"gia": "2045",
				"ddd": "17",
				"siafi": "6209"
				};

			jQuery.ajax({
				method: "GET",
				url: url,
				"dataType": "jsonp",
				success: function (response) {
					console.log('response: ', response);
					assert.deepEqual(response, cepEsperado, "CEP Igual...")
				},
				error: function(error) {
					assert.throws( function () {
						throw "Erro";
					}, cepEsperado, JSON.stringify(err))
				},
				complete: function() {
					done();
				}
			})	
		}

  });

	// Módulo I
	QUnit.module("Módulo I - Test QUnit - Veracidade", {
		beforeEach: function (assert) {
      assert.ok(true, "Inicio do Teste");
		},
		afterEach: function (assert) {
			assert.ok(true, "Final do Teste");
		}		
	});
	// Assert ok e notOk (assert -> asserção, afirmação)
	// teste de veracidade do resultado boolean
  QUnit.test("Assert ok and notOk", function(assert) { 
		let hasJQuery = window.jQuery ? true : false;
		console.log('hasJQuery: ', hasJQuery);
    assert.ok(hasJQuery, "Test Ok");
		assert.notOk(hasJquery, "Test false");
  });

	// Módulo II
	QUnit.module("Módulo II - Test QUnit Geral", {
		beforeEach: function (assert) {
      assert.ok(true, "Inicio do Teste");
		},
		afterEach: function (assert) {
			assert.ok(true, "Final do Teste");
		}		
	});
	QUnit.test("Assert equal and notEqual", function(assert) { 
		let a = 1;
		let b = 1;
    assert.equal(a, b, "Test equal");
		assert.notOk(a, b, "Test notEqual");
		// strictEqual - identico
		assert.strictEqual(a, b, "Test Identico");
		assert.notStrictEqual(a, b, "Test não Identico");
  });

	// Módulo III
	QUnit.module("Módulo III - Test QUnit Geral", {
		beforeEach: function (assert) {
      assert.ok(true, "Inicio do Teste");
		},
		afterEach: function (assert) {
			assert.ok(true, "Final do Teste");
		}		
	});
	// Assert (assert -> asserção, afirmação)
	// deepEqual, deepNotEqual - Teste de igualdade de vetores e objeto
  QUnit.test("Equal e NotEqual", function(assert) { 
		let v1 = ['um', 'dois', 'tres'];
		let v2 = ['um', 'dois', 'tres'];
		let v3 = ['um', 'dois'];
    assert.deepEqual(v1, v2, "Test Equal");
		assert.notDeepEqual(v1, v3, "Teste not Equal");
  });

// Módulo IV
QUnit.module("Módulo IV - Test QUnit", {
	beforeEach: function (assert) {
		assert.ok(true, "Inicio do Teste");
	},
	afterEach: function (assert) {
		assert.ok(true, "Final do Teste");
	}		
});
// skip -> pula o teste
QUnit.skip("Assert ok and notOk", function(assert) { 
	assert.ok(true, "Test Ok");
	assert.notOk(false, "Test false");
});	

// Módulo V
QUnit.module("Módulo V - Test QUnit", {
	beforeEach: function (assert) {
		assert.ok(true, "Inicio do Teste");
	},
	afterEach: function (assert) {
		assert.ok(true, "Final do Teste");
	}		
});
// only -> executa apenas este teste
// QUnit.only("Assert ok and notOk", function(assert) { 
// 	assert.ok(true, "Test Ok");
// 	assert.notOk(false, "Test false");
// });

// Módulo VI
QUnit.module("Módulo VI - Test QUnit", {
	beforeEach: function (assert) {
		assert.ok(true, "Inicio do Teste");
	},
	afterEach: function (assert) {
		assert.ok(true, "Final do Teste");
	}		
});
QUnit.test("Async setTimeout", function(assert) { 
	var done = assert.async(3) // quantidade de callbacks
	setTimeout( function() {
		assert.ok(true, 'Callback 1');
		done(); // 1
	})
	setTimeout( function() {
		assert.ok(true, 'Callback 2');
		done(); // 2
	})
	setTimeout( function() {
		assert.ok(true, 'Callback 3');
		done(); // 3
	})
});	





});
