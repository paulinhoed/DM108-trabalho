var PlayerController = {
    playerArray: [],
    init: function () {
        //Register events via framework7
        $$(document).on("click", "#btnAddPlayer", PlayerController.goToAdd);
        $$(document).on("click", "#save", PlayerController.save);
        $$(document).on("click", "#cancel", PlayerController.cancel);

        PlayerController.loadLocalData();
        PlayerController.refreshPlayerList();



    },
    loadLocalData: function () {
        NativeStorage.getItem("playerData", (sucess) => {
            PlayerController.playerArray = JSON.parse(sucess);
            console.log('success: ' + sucess);
        }, (err) => {
            console.log('error: ' + err);
        });
    },
    goToAdd: function () {
        mainView.router.loadPage("addPlayer.html");
    },

    save: function () {
        var name        = $$("#name").val();
        var type        = $$("#type").val();
        var lineage     = $$("#lineage").val();
        var line        = $$("#line").val();
        var description = $$("#description").val();
        var gold        = $$("#gold").val();
        var body        = $$("#body_stats").val();
        var mind        = $$("#mind_stats").val();
        var soul        = $$("#soul_stats").val();
        var darkness    = $$("#darkness_stats").val();

        var id = $$("#edit").val();
        
                var playerData = {
                    id: id,
                    name: name,
                    type: type,
                    lineage: lineage,
                    line: line,
                    description: description,
                    gold: gold,
                    body: body,
                    mind: mind,
                    soul: soul,
                    darkness: darkness
                }

        PlayerController.playerArray.push(playerData);

        if (!id) {
            PlayerService.add(name, type, lineage, line, description, gold, body, mind, soul, darkness);
        } else {
            var player = new Player(name, type, lineage, line, description, gold, body, mind, soul, darkness);
            player.id = id;
            PlayerService.edit(player);
        }
        NativeStorage.setItem("playerData", JSON.stringify(PlayerController.playerArray), (success) => {
            console.log("success: " + success);
        }, (err) => {
            console.log("error" + err);
        });
        
        PlayerController.refreshPlayerList();
    },

    cancel: function () {
        PlayerController.refreshPlayerList();
    },

    refreshPlayerList: function () {
        //back to view
        mainView.router.back();

        var playerList = PlayerController.playerArray;
        //virtual list framework 7
        myApp.virtualList('.list-block.virtual-list', {
            items: playerList,
            // Template 7 template ira renderizar os itens
            template: '<li>' +
            '<a href="addPlayer.html?name={{name}}&type={{type}}&lineage={{lineage}}&line={{line}}"' +
            'description={{description}}&gold={{gold}}&body{{body_stats}}&mind={{mind_stats}}&soul={{soul_stats}}"' +
            'darkness={{darkness_stats}}"' +
            'class="item-link">' +
            '<div class="item-content">' +
            '<div class="item-inner">' +
            '<div class="item-title">{{name}}</div>' +
            '<div class="item-after">{{type}}</div>' +
            '<div class="item-after">{{lineage}}</div>' +
            '<div class="item-after">{{line}}</div>' +
            '<div class="item-after">{{description}}</div>' +
            '<div class="item-after">{{gold}}</div>' +
            '<div class="item-after">{{body}}</div>' +
            '<div class="item-after">{{mind}}</div>' +
            '<div class="item-after">{{soul}}</div>' +
            '<div class="item-after">{{darkness}}</div>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</li>'
        });
    }
}