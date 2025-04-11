"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicItemType = exports.CharacterClass = void 0;
// Enum para as classes de personagens
var CharacterClass;
(function (CharacterClass) {
    CharacterClass["GUERREIRO"] = "Guerreiro";
    CharacterClass["MAGO"] = "Mago";
    CharacterClass["ARQUEIRO"] = "Arqueiro";
    CharacterClass["LADINO"] = "Ladino";
    CharacterClass["BARDO"] = "Bardo";
})(CharacterClass || (exports.CharacterClass = CharacterClass = {}));
// Enum para os tipos de itens mágicos
var MagicItemType;
(function (MagicItemType) {
    MagicItemType["ARMA"] = "Arma";
    MagicItemType["ARMADURA"] = "Armadura";
    MagicItemType["AMULETO"] = "Amuleto";
})(MagicItemType || (exports.MagicItemType = MagicItemType = {}));
