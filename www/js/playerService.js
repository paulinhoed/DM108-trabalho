var PlayerService = {
    
        players: new Array(),
    
        getAll: function(){
            return this.players;
        },
    
        getPlayerByName: function(name){
            for (var i = 0; i < this.playerslength; i++) {
                var index = this.players[i].name.indexOf(name);
                if (index > -1) {
                    return this.players[i];
                }
            }
        },
        add: function(name, type, lineage, line, description, gold, body, mind, soul, darkness) {
            var player = new Player(name, type, lineage, line, description, gold, body, mind, soul, darkness);
            player.id = this.players.length;
            this.players.push(player);
        },
    
        remove: function(name){
            for (var i = this.players.length - 1; i >= 0; i--) {
                var index = this.players[i].name.indexOf(name);
                if (index > -1) {
                    this.players.splice(index, 1);
                }
            }
            
        },
    
        edit: function(player){
            for (var i = 0; i < this.players.length; i++) {
                if (this.players[i].id == player.id) {
                    this.players[i] = player;
                    break;
                }
            }
        }
    }