export type ReferenceRow = {
  label: string;
  cells: readonly string[];
};

/**
 * Nachschlage-Tabelle für die Themenseiten. Ab `sm` eine echte Tabelle, darunter
 * gestapelte Karten – eine horizontal scrollende Tabelle ist auf dem Handy
 * unbrauchbar.
 */
export function ReferenceTable({
  title,
  intro,
  headers,
  rows,
  note,
}: {
  title: string;
  intro?: string;
  headers: readonly string[];
  rows: readonly ReferenceRow[];
  note?: string;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {intro ? (
        <p className="text-sm leading-6 text-black/75 dark:text-white/75">
          {intro}
        </p>
      ) : null}

      <div className="hidden overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 sm:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-black/[0.03] dark:bg-white/[0.06]">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                {headers[0]}
              </th>
              {headers.slice(1).map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-t border-black/5 align-top dark:border-white/10"
              >
                <th
                  scope="row"
                  className="px-4 py-3 text-left font-medium text-violet-800 dark:text-violet-200"
                >
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={headers[i + 1] ?? i}
                    className="px-4 py-3 leading-6 text-black/75 dark:text-white/75"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 sm:hidden">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-white/5"
          >
            <p className="font-medium text-violet-800 dark:text-violet-200">
              {row.label}
            </p>
            <dl className="mt-2 space-y-2">
              {row.cells.map((cell, i) => (
                <div key={headers[i + 1] ?? i}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-black/45 dark:text-white/45">
                    {headers[i + 1]}
                  </dt>
                  <dd className="text-sm leading-6 text-black/75 dark:text-white/75">
                    {cell}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {note ? (
        <p className="text-xs leading-5 text-black/55 dark:text-white/55">
          {note}
        </p>
      ) : null}
    </section>
  );
}
