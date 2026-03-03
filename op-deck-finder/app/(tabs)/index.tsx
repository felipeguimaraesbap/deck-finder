import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const deckDatabase = [
  { name: 'Imu', colors: ['Preto'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Governo Mundial', game_stage: 'Late Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP09-093.png' },
  { name: 'Dracule Mihawk', colors: ['Verde'], strategy: 'Direto', stance: 'Ofensivo', length: 'Média', crew: 'Cross Guild', game_stage: 'Early Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP01-070.png' },
  { name: 'Portgas.D.Ace', colors: ['Vermelho', 'Azul'], strategy: 'Direto', stance: 'Ofensivo', length: 'Curta', crew: 'Piratas do Barba Branca', game_stage: 'Early Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP03-001.png' },
  { name: 'Boa Hancock', colors: ['Azul', 'Amarelo'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Outro', game_stage: 'Late Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP07-038.png' },
  { name: 'Donquixote Doflamingo', colors: ['Roxo'], strategy: 'Combo', stance: 'Ofensivo', length: 'Média', crew: 'Outro', game_stage: 'Late Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP01-060.png' },
  { name: 'Gecko Moria', colors: ['Preto', 'Amarelo'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Outro', game_stage: 'Late Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP06-086.png' },
  { name: 'Nefeltari Vivi', colors: ['Vermelho', 'Azul'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Outro', game_stage: 'Late Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP04-001.png' },
  { name: 'Nami', colors: ['Azul'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Chapéus de Palha', game_stage: 'Late Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP03-040.png' },
  { name: 'Jewelry Bonney', colors: ['Amarelo'], strategy: 'Direto', stance: 'Ofensivo', length: 'Média', crew: 'Outro', game_stage: 'Early Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP07-019.png' },
  { name: 'Charlotte Katakuri', colors: ['Amarelo'], strategy: 'Direto', stance: 'Ofensivo', length: 'Média', crew: 'Piratas da Big Mom', game_stage: 'Early Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP03-099.png' },
  { name: 'Uta', colors: ['Verde', 'Roxo'], strategy: 'Combo', stance: 'Ofensivo', length: 'Média', crew: 'Piratas do Ruivo', game_stage: 'Early Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP06-001.png' },
  { name: 'Luffy (ST13)', colors: ['Preto', 'Amarelo'], strategy: 'Combo', stance: 'Ofensivo', length: 'Média', crew: 'Chapéus de Palha', game_stage: 'Late Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/ST13-003.png' },
  { name: 'Perona', colors: ['Preto', 'Verde'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Outro', game_stage: 'Late Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP06-021.png' },
  { name: 'Yamato', colors: ['Verde', 'Amarelo'], strategy: 'Direto', stance: 'Ofensivo', length: 'Curta', crew: 'Outro', game_stage: 'Early Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP06-022.png' },
  { name: 'Trafalgar Law (RP)', colors: ['Vermelho', 'Roxo'], strategy: 'Combo', stance: 'Ofensivo', length: 'Média', crew: 'Piratas Heart', game_stage: 'Early Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP05-069.png' },
  { name: 'Rob Lucci', colors: ['Preto'], strategy: 'Combo', stance: 'Ofensivo', length: 'Média', crew: 'Governo Mundial', game_stage: 'Late Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP07-079.png' },
  { name: 'Shanks', colors: ['Vermelho'], strategy: 'Direto', stance: 'Ofensivo', length: 'Curta', crew: 'Piratas do Ruivo', game_stage: 'Early Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP01-001.png' },
  { name: 'Belo Betty', colors: ['Vermelho', 'Amarelo'], strategy: 'Direto', stance: 'Ofensivo', length: 'Curta', crew: 'Revolucionários', game_stage: 'Early Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP05-002.png' },
  { name: 'Enel', colors: ['Amarelo'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Outro', game_stage: 'Late Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP05-060.png' },
  { name: 'Sir Crocodile', colors: ['Preto'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Cross Guild', game_stage: 'Late Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP04-058.png' },
  { name: 'Gol.D.Roger', colors: ['Vermelho', 'Roxo'], strategy: 'Direto', stance: 'Ofensivo', length: 'Média', crew: 'Piratas do Roger', game_stage: 'Early Game', img: 'https://limitless-tcg.s3.us-central-1.amazonaws.com/one-piece/cards/OP09-001.png' }
];

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = (key, value) => {
    setAnswers({ ...answers, [key]: value });
    setStep(step + 1);
  };

  const getWinner = () => {
    let bestMatch = null;
    let topScore = -1;
    const color1 = answers.color1;
    const color2 = answers.color2;
    const isMono = color1 === color2;

    deckDatabase.forEach(deck => {
      let score = 0;
      // PESO ABSOLUTO NA COR (Prioridade 1)
      if (isMono) {
        if (deck.colors.length === 1 && deck.colors.includes(color1)) score += 100;
        else if (deck.colors.includes(color1)) score += 40;
      } else {
        if (deck.colors.includes(color1) && deck.colors.includes(color2)) score += 100;
        else if (deck.colors.includes(color1)) score += 50;
        else if (deck.colors.includes(color2)) score += 30;
      }
      // CRITÉRIOS DE ESTILO (Prioridade 2)
      if (deck.strategy === answers.strategy) score += 5;
      if (deck.game_stage === answers.game_stage) score += 5;
      if (deck.stance === answers.stance) score += 5;
      if (deck.crew === answers.crew) score += 2;

      if (score > topScore) {
        topScore = score;
        bestMatch = deck;
      }
    });
    return { deck: bestMatch, userColor: color1 };
  };

  const renderSplitName = (name, colors) => {
    if (colors.length === 1) {
      return <Text style={[styles.title, { color: getColorHex(colors[0]) }]}>{name}</Text>;
    }
    const middle = Math.ceil(name.length / 2);
    const firstHalf = name.substring(0, middle);
    const secondHalf = name.substring(middle);
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Text style={[styles.title, { color: getColorHex(colors[0]) }]}>{firstHalf}</Text>
        <Text style={[styles.title, { color: getColorHex(colors[1]) }]}>{secondHalf}</Text>
      </View>
    );
  };

  if (step === 0) return (
    <View style={styles.splashContainer}>
      <StatusBar hidden />
      <TouchableOpacity style={styles.fullBtn} onPress={() => setStep(1)}>
        <View style={styles.hatCircle}>
          <Text style={{ fontSize: 60 }}>🍖</Text>
          <Text style={styles.splashTitle}>ONE PIECE</Text>
          <Text style={styles.splashSub}>DECK FINDER</Text>
          <View style={styles.hatRibbon} />
        </View>
        <Text style={styles.touchText}>TOCAR PARA INICIAR</Text>
      </TouchableOpacity>
    </View>
  );

  if (step >= 1 && step <= 6) {
    const questions = [
      { key: 'color1', q: '1. Escolha seu Arquétipo:', options: [{ t: 'Samurai', c: 'Vermelho' }, { t: 'Ninja', c: 'Azul' }, { t: 'Monge', c: 'Amarelo' }, { t: 'Yokai', c: 'Preto' }, { t: 'Sotoku', c: 'Roxo' }, { t: 'Tengu', c: 'Verde' }] },
      { key: 'color2', q: '2. Qual sua personalidade?', options: [{ t: 'Agressivo', c: 'Vermelho' }, { t: 'Brincalhão', c: 'Azul' }, { t: 'Ambicioso', c: 'Amarelo' }, { t: 'Estrategista', c: 'Preto' }, { t: 'Dominador', c: 'Roxo' }, { t: 'Controlador', c: 'Verde' }] },
      { key: 'strategy', q: '3. Estratégia preferida:', options: ['Combo', 'Direto'] },
      { key: 'stance', q: '4. Postura de Jogo:', options: ['Ofensivo', 'Defensivo'] },
      { key: 'game_stage', q: '5. Foco do seu Deck:', options: ['Early Game', 'Late Game'] },
      { key: 'crew', q: '6. Tripulação Favorita:', options: ['Chapéus de Palha', 'Cross Guild', 'Piratas do Barba Branca', 'Piratas do Ruivo', 'Piratas do Roger', 'Governo Mundial', 'Piratas Heart', 'Outro'] }
    ];
    const current = questions[step - 1];
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{current.q}</Text>
        <ScrollView style={{ width: '100%' }}>
          {current.options.map((opt) => (
            <TouchableOpacity key={opt.t || opt} style={[styles.card, opt.c && { borderColor: getColorHex(opt.c) }]} onPress={() => handleNext(current.key, opt.c || opt)}>
              <Text style={styles.cardText}>{opt.t || opt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (step === 7) {
    const result = getWinner();
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>Sua Cor Ideal: <Text style={{color: getColorHex(result.userColor), fontWeight: 'bold'}}>{result.userColor}</Text></Text>
        {renderSplitName(result.deck.name, result.deck.colors)}
        <View style={styles.tagRow}>
           <Text style={styles.tag}>{result.deck.strategy}</Text>
           <Text style={styles.tag}>{result.deck.game_stage}</Text>
        </View>
        <Image source={{ uri: result.deck.img }} style={styles.cardImg} />
        <View style={styles.quoteBox}><Text style={styles.quote}>"Em breve o depoimento aqui!"</Text></View>
        <TouchableOpacity style={styles.btn} onPress={() => setStep(0)}><Text style={styles.btnText}>RECOMEÇAR</Text></TouchableOpacity>
      </ScrollView>
    );
  }
}

const getColorHex = (c) => {
  const map = { 'Vermelho': '#FF3B30', 'Azul': '#007AFF', 'Amarelo': '#FFCC00', 'Preto': '#999', 'Roxo': '#AF52DE', 'Verde': '#4CD964' };
  return map[c] || '#FFF';
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center', padding: 20, paddingTop: 60 },
  splashContainer: { flex: 1, backgroundColor: '#ED1D24' },
  fullBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  hatCircle: { width: 260, height: 260, backgroundColor: '#FFCC00', borderRadius: 130, justifyContent: 'center', alignItems: 'center', borderWidth: 8, borderColor: '#FFF', position: 'relative', overflow: 'hidden' },
  hatRibbon: { position: 'absolute', bottom: 40, width: '100%', height: 25, backgroundColor: '#ED1D24' },
  splashTitle: { color: '#000', fontSize: 32, fontWeight: 'bold' },
  splashSub: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  touchText: { color: '#FFF', marginTop: 40, letterSpacing: 2, fontWeight: 'bold' },
  question: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#1E1E1E', width: '100%', padding: 15, borderRadius: 10, marginVertical: 6, borderWidth: 2 },
  cardText: { color: '#FFF', textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
  title: { fontSize: 34, fontWeight: 'bold', textAlign: 'center', marginVertical: 5 },
  subtitle: { color: '#FFF', fontSize: 18, marginBottom: 5 },
  tagRow: { flexDirection: 'row', marginBottom: 15 },
  tag: { backgroundColor: '#333', color: '#FFCC00', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginHorizontal: 5, fontSize: 12, fontWeight: 'bold' },
  cardImg: { width: 220, height: 310, borderRadius: 10, marginBottom: 20 },
  quoteBox: { backgroundColor: '#222', padding: 15, borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#FFCC00', width: '100%' },
  quote: { color: '#CCC', fontStyle: 'italic', textAlign: 'center' },
  btn: { backgroundColor: '#FFCC00', padding: 15, borderRadius: 30, marginTop: 25, width: 200, alignItems: 'center' },
  btnText: { fontWeight: 'bold', color: '#000' }
});