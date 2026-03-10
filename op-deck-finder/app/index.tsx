import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

// Banco de dados atualizado
const deckDatabase = [
  { name: 'Imu', colors: ['Preto'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Governo Mundial', game_stage: 'Late Game', codigo: 'OP13-079' },
  { name: 'Dracule Mihawk', colors: ['Verde'], strategy: 'Direto', stance: 'Ofensivo', length: 'Média', crew: 'Cross Guild', game_stage: 'Early Game', codigo: 'OP14-020' },
  { name: 'Portgas.D.Ace', colors: ['Vermelho', 'Azul'], strategy: 'Direto', stance: 'Ofensivo', length: 'Curta', crew: 'Piratas do Barba Branca', game_stage: 'Early Game', codigo: 'OP13-002' },
  { name: 'Boa Hancock', colors: ['Azul', 'Amarelo'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Outro', game_stage: 'Late Game', codigo: 'OP14-041' },
  { name: 'Donquixote Doflamingo', colors: ['Roxo'], strategy: 'Combo', stance: 'Ofensivo', length: 'Média', crew: 'Outro', game_stage: 'Late Game', codigo: 'OP14-060' },
  { name: 'Gecko Moria', colors: ['Preto', 'Amarelo'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Outro', game_stage: 'Late Game', codigo: 'OP14-080' },
  { name: 'Nefeltari Vivi', colors: ['Vermelho', 'Azul'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Outro', game_stage: 'Late Game', codigo: 'EB03-001' },
  { name: 'Nami', colors: ['Azul'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Chapéus de Palha', game_stage: 'Late Game', codigo: 'OP11-041' },
  { name: 'Jewelry Bonney', colors: ['Amarelo'], strategy: 'Direto', stance: 'Ofensivo', length: 'Média', crew: 'Outro', game_stage: 'Early Game', codigo: 'OP13-100' },
  { name: 'Charlotte Katakuri', colors: ['Amarelo'], strategy: 'Direto', stance: 'Ofensivo', length: 'Média', crew: 'Piratas da Big Mom', game_stage: 'Early Game', codigo: 'OP11-062' },
  { name: 'Uta', colors: ['Verde', 'Roxo'], strategy: 'Combo', stance: 'Ofensivo', length: 'Média', crew: 'Piratas do Ruivo', game_stage: 'Early Game', codigo: 'OP06-001' },
  { name: 'Luffy (ST13)', colors: ['Preto', 'Amarelo'], strategy: 'Combo', stance: 'Ofensivo', length: 'Média', crew: 'Chapéus de Palha', game_stage: 'Late Game', codigo: 'ST13-003' },
  { name: 'Perona', colors: ['Preto', 'Verde'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Outro', game_stage: 'Late Game', codigo: 'OP06-021' },
  { name: 'Yamato', colors: ['Verde', 'Amarelo'], strategy: 'Direto', stance: 'Ofensivo', length: 'Curta', crew: 'Outro', game_stage: 'Early Game', codigo: 'OP06-022' },
  { name: 'Trafalgar Law (RP)', colors: ['Vermelho', 'Roxo'], strategy: 'Combo', stance: 'Ofensivo', length: 'Média', crew: 'Piratas Heart', game_stage: 'Early Game', codigo: 'ST10-001' },
  { name: 'Rob Lucci', colors: ['Preto'], strategy: 'Combo', stance: 'Ofensivo', length: 'Média', crew: 'Governo Mundial', game_stage: 'Late Game', codigo: 'OP07-079' },
  { name: 'Shanks', colors: ['Vermelho'], strategy: 'Direto', stance: 'Ofensivo', length: 'Curta', crew: 'Piratas do Ruivo', game_stage: 'Early Game', codigo: 'OP09-001' },
  { name: 'Belo Betty', colors: ['Vermelho', 'Amarelo'], strategy: 'Direto', stance: 'Ofensivo', length: 'Curta', crew: 'Revolucionários', game_stage: 'Early Game', codigo: 'OP05-002' },
  { name: 'Enel', colors: ['Amarelo'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Outro', game_stage: 'Late Game', codigo: 'OP05-098' },
  { name: 'Sir Crocodile', colors: ['Preto'], strategy: 'Combo', stance: 'Defensivo', length: 'Longa', crew: 'Cross Guild', game_stage: 'Late Game', codigo: 'OP14-079' },
  { name: 'Gol.D.Roger', colors: ['Vermelho', 'Roxo'], strategy: 'Direto', stance: 'Ofensivo', length: 'Média', crew: 'Piratas do Roger', game_stage: 'Early Game', codigo: 'OP13-003' }
];

export default function Index() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Referência para animação (0 = invisível, 1 = visível/impacto)
  const punchAnim = useRef(new Animated.Value(0)).current;

  const runPunchAnimation = (callback: () => void) => {
    setIsTransitioning(true);

    Animated.sequence([
      // Impacto rápido
      Animated.timing(punchAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      // Frame do soco (delay curto)
      Animated.delay(80),
      // Troca os dados da pergunta por trás do soco
      Animated.callback(() => {
        callback();
      }),
      // Limpa a tela
      Animated.timing(punchAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsTransitioning(false);
    });
  };

  const handleNext = (key: string, value: string) => {
    if (isTransitioning) return;

    const updatedAnswers = { ...answers, [key]: value };
    setAnswers(updatedAnswers);

    runPunchAnimation(() => {
      setStep(step + 1);
    });
  };

  const getWinner = () => {
    let bestMatch: any = null;
    let topScore = -1;
    const color1 = answers.color1;
    const color2 = answers.color2;
    const isMono = color1 === color2;

    deckDatabase.forEach(deck => {
      let score = 0;
      if (isMono) {
        if (deck.colors.length === 1 && deck.colors.includes(color1)) score += 100;
        else if (deck.colors.includes(color1)) score += 40;
      } else {
        if (deck.colors.includes(color1) && deck.colors.includes(color2)) score += 100;
        else if (deck.colors.includes(color1)) score += 50;
        else if (deck.colors.includes(color2)) score += 30;
      }
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

  const getColorHex = (c: string) => {
    const map: any = { 'Vermelho': '#FF3B30', 'Azul': '#007AFF', 'Amarelo': '#FFCC00', 'Preto': '#FFF', 'Roxo': '#AF52DE', 'Verde': '#4CD964' };
    return map[c] || '#FFF';
  };

  const renderSplitName = (name: string, colors: string[]) => {
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

  // Componente do Soco
  const PunchOverlay = () => {
    const opacity = punchAnim.interpolate({
      inputRange: [0, 0.1, 0.9, 1],
      outputRange: [0, 1, 1, 0],
    });

    const scale = punchAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1.2],
    });

    return (
      <Animated.View style={[styles.punchWrapper, { opacity, transform: [{ scale }] }]}>
        <Image 
          source={require('./assets/luffy-punch.gif')} 
          style={styles.punchGif} 
          resizeMode="contain" 
        />
      </Animated.View>
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
        <PunchOverlay />
        <Text style={styles.question}>{current.q}</Text>
        <ScrollView style={{ width: '100%' }}>
          {current.options.map((opt: any) => (
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
    const imageUrl = `https://deckbuilder.egmanevents.com/card_images/optcg/${result.deck.codigo}.webp`;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>Sua Cor Ideal: <Text style={{color: getColorHex(result.userColor), fontWeight: 'bold'}}>{result.userColor}</Text></Text>
        {renderSplitName(result.deck.name, result.deck.colors)}
        <View style={styles.tagRow}>
           <Text style={styles.tag}>{result.deck.strategy}</Text>
           <Text style={styles.tag}>{result.deck.game_stage}</Text>
           <Text style={styles.tag}>{result.deck.crew}</Text>
        </View>
        <View style={styles.imageShadow}>
          <Image source={{ uri: imageUrl }} style={styles.cardImg} resizeMode="contain" />
        </View>
        <View style={styles.quoteBox}>
          <Text style={styles.quote}>"O Rei dos Piratas é aquele que tem mais liberdade no mar!"</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => setStep(0)}>
          <Text style={styles.btnText}>RECOMEÇAR</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center', padding: 20, paddingTop: 60, position: 'relative' },
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
  tagRow: { flexDirection: 'row', marginBottom: 15, flexWrap: 'wrap', justifyContent: 'center' },
  tag: { backgroundColor: '#333', color: '#FFCC00', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginHorizontal: 5, marginVertical: 2, fontSize: 12, fontWeight: 'bold' },
  imageShadow: { elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 10 },
  cardImg: { width: 240, height: 340, borderRadius: 12, marginBottom: 20 },
  quoteBox: { backgroundColor: '#222', padding: 15, borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#FFCC00', width: '100%' },
  quote: { color: '#CCC', fontStyle: 'italic', textAlign: 'center' },
  btn: { backgroundColor: '#FFCC00', padding: 15, borderRadius: 30, marginTop: 25, width: 200, alignItems: 'center' },
  btnText: { fontWeight: 'bold', color: '#000' },
  // Estilos da Animação
  punchWrapper: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 999, backgroundColor: 'rgba(0,0,0,0.1)' },
  punchGif: { width: width, height: height },
});