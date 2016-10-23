var ICON = './images/logo.png';
var NO_POINTS = '0';

var cardBadge = function(t) {
  return t.get('card', 'shared', 'points').then(function(points) {
      var pointssum = 0;
      for(var el in points ) {
          if( points.hasOwnProperty( el ) ) {
              pointssum += parseFloat( points[el] );
          }
      }
      return [{
        dynamic: function() {
          return {
            text: pointssum,
            icon: ICON
          }
        }
      }]
  });
};

var cardButton = function(t) {
  return t.get('card', 'shared', 'points').then(function(points) {
      var member = t.args['0'].context.member;
      if(points[member].length > 0) pointssum = points[member];
      else pointssum = 0;
      var text = pointssum + " points";
    return [
      {
        icon: ICON,
        text: text,
        callback: cardButtonCallback
      }
    ];
  });
};

var cardButtonCallback = function(t) {
  var points = [NO_POINTS, 1, 2, 3, 4, 5].map(function(point) {
    return {
      text: point+' points',
      callback: function(t) {
          var member = t.args['0'].context.member;
          return t.get('card', 'shared', 'points').then(function(points) {
              if (point != NO_POINTS) {
                  points[member] = point;
                  return t.set('card', 'shared', 'points', points).then(function() {
                      return t.closePopup();
                  });
              }
          });
      }
    };
  });

  return t.popup({
    title: 'How many points?',
    items: points
  });
};

TrelloPowerUp.initialize({
  'card-badges': function(t, options) {
    return cardBadge(t);
  },
  'card-buttons': function(t, options) {
    return cardButton(t);
  }
});
