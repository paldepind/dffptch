describe('dffptch', function() {
  it('applies modifications', function() {
    var o1 = {
      animal: 'dog',
      house: 'Somewhere 1',
    };
    var o2 = {
      animal: 'dog',
      house: 'Somewhere 2',
    };
    var delta = dffptch.diff(o1, o2);
    dffptch.patch(o1, delta);
    assert.deepEqual(o1, o2);
  });
  it('handles additions', function() {
    var o1 = {
      age: 4,
    };
    var o2 = {
      name: 'Cuddler',
      age: 4,
      color: 'brown',
      type: 'rabbit',
    };
    var delta = dffptch.diff(o1, o2);
    dffptch.patch(o1, delta);
    assert.deepEqual(o1, o2);
  });
  it('removes deleted properties', function() {
    var o1 = {
      name: 'Snuski',
      type: 'Rabbit',
      color: 'Black',
      age: 4,
    };
    var o2 = {
      name: 'Snuski'
    };
    var delta = dffptch.diff(o1, o2);
    dffptch.patch(o1, delta);
    assert.deepEqual(o1, o2);
  });
  it('appends to arrays', function() {
    var a1 = ['dog','horse','goat'];
    var a2 = ['dog','horse','goat', 'rabbit'];
    var delta = dffptch.diff(a1, a2);
    dffptch.patch(a1, delta);
    assert(a1.length === 4);
    assert(a1[3] === 'rabbit');
  });
  it('modifies arrays', function() {
    var a1 = ['dog','horse','goat'];
    var a2 = ['goat','horse', 'cat', 'rabbit'];
    var delta = dffptch.diff(a1, a2);
    dffptch.patch(a1, delta);
    assert.deepEqual(a1, a2);
  });
  it('picks up on type changes', function() {
    var o1 = {
      age: '4',
    };
    var o2 = {
      age: 4,
    };
    var delta = dffptch.diff(o1, o2);
    dffptch.patch(o1, delta);
    assert(o1.age === 4);
  });
  it('handles null', function() {
    var o1 = {
      age: null,
      color: 'brown',
      name: null,
    };
    var o2 = {
      age: 4,
      color: null,
      name: null,
    };
    var delta = dffptch.diff(o1, o2);
    dffptch.patch(o1, delta);
    assert.deepEqual(o1, o2);
  });
  it('diffs recursively', function() {
    var o1 = {
      type: 'horse',
      parent: {
        type: 'goat',
        color: 'brown'
      }
    };
    var o2 = {
      type: 'goat',
      parent: {
        type: 'goat',
        color: 'grey',
        parent: {
          type: 'horse',
          color: 'light-grey'
        }
      }
    };
    var delta = dffptch.diff(o1, o2);
    dffptch.patch(o1, delta);
    assert.deepEqual(o1, o2);
  });
  it('only add recurse field if there are changes', function() {
    var o1 = {
      type: 'horse',
      parent: {
        type: 'goat',
        color: 'grey'
      }
    };
    var o2 = {
      type: 'goat',
      parent: {
        type: 'goat',
        color: 'grey',
      }
    };
    var delta = dffptch.diff(o1, o2);
    assert.equal(delta.r, undefined);
  });
  it('handles everything at once', function() {
    var rabbit = {
      name: 'Trumph',
      sex: 'male',
      foods: ['carrots', 'salad'],
      parents: [{name: 'Fluffy', sex: 'female', color: 'white'}],
    };
    var updatedRabbit = {
      name: 'Trumph',
      sex: 'female',
      color: 'light-brown',
      foods: ['carrots', 'herbs', 'salad', 'pellets'],
      parents: [{name: 'Fluffy', sex: 'male', color: 'brown'},
                {name: 'Flabber', sex: 'female', color: 'white'}],
    };
    var delta = dffptch.diff(rabbit, updatedRabbit);
    dffptch.patch(rabbit, delta);
    assert.deepEqual(rabbit, updatedRabbit);
  });
});
