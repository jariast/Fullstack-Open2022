enum BmiClassesLabels {
  Under03 = 'Underweight (Severe thinness)',
  Under02 = 'Underweight (Moderate thinness)',
  Under01 = 'Underweight (Mild thinness)',
  Normal = 'Normal (healthy weight)',
  Over = 'Overweight (Pre-Obese)',
  Obese01 = 'Obese (Class I)',
  Obese02 = 'Obsee (Class II)',
  Obese03 = 'Obese (Class III)',
}

function calculateBmi(height: number, weight: number): string {
  const bmi = (weight / height ** 2) * 10000; // We multiply by 100 because were given the height in cm, we also must multiply by another 100 because the index is a percentage

  if (bmi < 16) {
    return BmiClassesLabels.Under03;
  } else if (bmi >= 16.0 && bmi <= 16.9) {
    return BmiClassesLabels.Under02;
  } else if (bmi >= 17.0 && bmi <= 18.4) {
    return BmiClassesLabels.Under01;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return BmiClassesLabels.Normal;
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return BmiClassesLabels.Over;
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    return BmiClassesLabels.Obese01;
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    return BmiClassesLabels.Obese02;
  } else if (bmi >= 40.0) {
    return BmiClassesLabels.Obese03;
  }
}

console.log(calculateBmi(186, 79));
