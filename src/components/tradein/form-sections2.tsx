type Errors = Record<string, string>;

export function MobilIncaranSection({ errors }: { errors: Errors }) {
  return (
    <fieldset>
      <legend className="text-lg font-semibold mb-4">Mobil Incaran</legend>
      <div>
        <label className="block text-sm font-medium mb-1.5">
          Mobil yang Diinginkan <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="targetCar"
          required
          className="input-field"
          placeholder="Contoh: Honda HR-V 2024"
        />
        {errors.targetCar && (
          <p className="mt-1 text-xs text-red-600">{errors.targetCar}</p>
        )}
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1.5">
          Catatan Tambahan
        </label>
        <textarea
          name="notes"
          rows={4}
          className="input-field"
          placeholder="Ceritakan kebutuhan Anda, misalnya budget, fitur yang diharapkan, dll."
        />
      </div>
    </fieldset>
  );
}
